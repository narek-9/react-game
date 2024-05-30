import { useEffect, useRef, useState } from "react";

import {
  defaultCityStoragesData,
  defaultDeposits,
  defaultStoragesData,
} from "../../config";
import { cityStorage, deposit, storage, transportOrder } from "../../types";

export const useAppLogic = () => {
  const [currentCityId, setcurrentCityId] = useState<number>(1);
  const [selectedGoodId, setSelectedGoodId] = useState<number>(1);
  const [deposits, setDeposits] = useState<deposit[]>(defaultDeposits);
  const [depositId, setDepositId] = useState<number>(3);
  const [playerStorages, setPlayerStorages] =
    useState<storage[]>(defaultStoragesData);
  const [cityStorages, setCityStorages] = useState<cityStorage[]>(
    defaultCityStoragesData
  );
  const [money, setMoney] = useState<number>(1000);
  const [days, setDays] = useState<number>(1);
  const [transportOrders, setTransportOrders] = useState<transportOrder[]>([]);
  const [orderId, setOrderId] = useState<number>(1);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getCurrentStorage = <T extends { cityId: number; storage: unknown[] }>(
    storages: T[],
    currentCityId: number
  ): T["storage"] => {
    const store = storages.find((storage) => storage.cityId === currentCityId);
    return store ? store.storage : [];
  };

  const sellGoods = (goodId: number, qty: number, totalPrice: number) => {
    const storagesNew = [...playerStorages];
    let moneyNew = money;

    const index = storagesNew.findIndex(
      (storage) => storage.cityId === currentCityId
    );

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex(
        (good) => good.id === goodId
      );

      if (goodIndex > -1) {
        const currentCityStorage = getCurrentStorage<cityStorage>(
          cityStorages,
          currentCityId
        );
        const cityGoodIndex = currentCityStorage.findIndex(
          (good) => good.id === goodId
        );

        if (cityGoodIndex > -1) {
          if (storagesNew[index].storage[goodIndex].qty >= qty) {
            storagesNew[index].storage[goodIndex].qty -= qty;
            moneyNew += totalPrice;

            if (storagesNew[index].storage[goodIndex].qty === 0) {
              removeProduct(storagesNew[index].storage[goodIndex].id);
            }

            setMoney(moneyNew);
          }
        }
      }
    }

    setPlayerStorages(storagesNew);
  };

  const getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));

  const updateCityStorages = () => {
    const newCityStorages = [...cityStorages];

    newCityStorages.forEach((cityStorage) => {
      cityStorage.storage.forEach((goodData) => {
        const priceChangeSign = getRandomInt(2) ? 1 : -1;
        const priceChangeValue =
          getRandomInt(goodData.maxStep + 1) * priceChangeSign;
        let newPrice =
          (goodData.priceStats.slice(-1).pop() || 0) + priceChangeValue;

        if (newPrice > goodData.maxPrice) {
          newPrice = goodData.maxPrice;
        } else if (newPrice < goodData.minPrice) {
          newPrice = goodData.minPrice;
        }

        goodData.priceStats.push(newPrice);
        goodData.priceStats.shift();
      });
    });

    setCityStorages(newCityStorages);
  };

  const updateTransportOrders = () => {
    setTransportOrders((oldTransportOrders) =>
      oldTransportOrders.map((order) => ({
        ...order,
        days: order.days > 0 ? order.days - 1 : order.days,
      }))
    );
  };

  const updateDeposits = () => {
    setDeposits((oldDeposits) => {
      const newDeposits = oldDeposits.map((deposit) => ({ ...deposit }));

      newDeposits.forEach((deposit, index) => {
        if (deposit.days > 0) {
          deposit.days -= 1;
        }

        if (deposit.days === 0) {
          newDeposits.splice(index, 1);

          setMoney((oldMoney) => oldMoney + deposit.amount * 1.1);
        }
      });

      return newDeposits;
    });
  };

  const liveProcess = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      updateCityStorages();
      updateTransportOrders();
      updateDeposits();
      setDays((days) => days + 1);
    }, 3000);
  };

  useEffect(() => {
    liveProcess();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const createTransportOrder = (targetCityId: number) => {
    const newOrders = [...transportOrders];
    const storage = getCurrentStorage<storage>(playerStorages, currentCityId);
    const goodIndex = storage.findIndex((good) => good.id === selectedGoodId);

    if (goodIndex > -1) {
      newOrders.push({
        id: orderId,
        fromCityId: currentCityId,
        targetCityId,
        goodId: selectedGoodId,
        qty: storage[goodIndex].qty,
        days: 30,
      });

      setOrderId(orderId + 1);
      removeProduct(selectedGoodId);
      setTransportOrders(newOrders);
    }
  };

  const removeProduct = (productId: number) => {
    const storagesNew = [...playerStorages];
    const index = storagesNew.findIndex(
      (storage) => storage.cityId === currentCityId
    );

    if (index > -1) {
      const productIndex = storagesNew[index].storage.findIndex(
        (product) => product.id === productId
      );

      if (productIndex > -1) {
        storagesNew[index].storage.splice(productIndex, 1);
      }
    }

    setPlayerStorages(storagesNew);
  };

  const buyGoods = (goodId: number, qty: number, price: number) => {
    const totalPrice = qty * price;

    if (money >= totalPrice) {
      const storagesNew = [...playerStorages];
      const index = storagesNew.findIndex(
        (storage) => storage.cityId === currentCityId
      );

      if (index > -1) {
        const goodIndex = storagesNew[index].storage.findIndex(
          (good) => good.id === goodId
        );

        if (goodIndex > -1) {
          const newQty = storagesNew[index].storage[goodIndex].qty + qty;
          storagesNew[index].storage[goodIndex].qty = newQty;
        } else {
          storagesNew[index].storage.push({
            id: goodId,
            qty: qty,
          });
        }
      }

      setPlayerStorages(storagesNew);
      setMoney(money - totalPrice);
    }
  };

  const acceptOrder = (order: transportOrder) => {
    setTransportOrders((orders) => {
      const newOrders = [...orders];
      const index = newOrders.findIndex((o) => o.id === order.id);

      if (index > -1) {
        newOrders.splice(index, 1);
      }

      return newOrders;
    });

    const storagesNew = [...playerStorages];
    const index = storagesNew.findIndex(
      (storage) => storage.cityId === order.targetCityId
    );

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex(
        (good) => good.id === order.goodId
      );

      if (goodIndex > -1) {
        storagesNew[index].storage[goodIndex].qty += order.qty;
      } else {
        storagesNew[index].storage.push({
          id: order.goodId,
          qty: order.qty,
        });
      }
    }

    setPlayerStorages(storagesNew);
  };

  const getSelectedProductPrice = () => {
    const cityStorage = getCurrentStorage<cityStorage>(
      cityStorages,
      currentCityId
    );
    const product = cityStorage.find(
      (product) => product.id === selectedGoodId
    );

    if (product && product.priceStats) {
      return product.priceStats[product.priceStats.length - 1];
    }

    return 0;
  };

  const openDeposit = (amount: number) => {
    if (amount > 0 && money >= amount) {
      setDeposits((oldDeposits) => {
        const newDeposits = oldDeposits.map((deposit) => ({ ...deposit }));

        newDeposits.push({
          id: depositId,
          days: 30,
          amount,
        });

        setDepositId(depositId + 1);
        setMoney((oldMoney) => {
          return oldMoney - amount;
        });

        return newDeposits;
      });
    }
  };

  return {
    currentCityId,
    playerStorages,
    selectedGoodId,
    transportOrders,
    days,
    money,
    deposits,
    cityStorages,
    setcurrentCityId,
    setSelectedGoodId,
    getCurrentStorage,
    getSelectedProductPrice,
    sellGoods,
    createTransportOrder,
    acceptOrder,
    buyGoods,
    openDeposit,
  };
};
