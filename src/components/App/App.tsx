import { FC, useEffect, useState, useRef } from "react";

import { cityStorage, good, storage, transportOrder } from "../../types";

import { Cities } from "../Cities/Cities";
import { Storage } from "../Storage/Storage";
import { Transportations } from "../Transportations/Transportations";
import { Stats } from "../Stats/Stats";
import { CityStorage } from "../CityStorage/CityStorage";

import "./App.scss";

export const App: FC = () => {
  const [currentCityId, setcurrentCityId] = useState<number>(1);
  const [selectedGoodId, setSelectedGoodId] = useState<number>(1);
  const [storages, setStorages] = useState<storage[]>([
    {
      cityId: 1,
      storage: [
        { id: 1, qty: 10 },
        { id: 2, qty: 20 },
        { id: 3, qty: 204 },
        { id: 4, qty: 200 },
        { id: 5, qty: 120 },
        { id: 6, qty: 10 },
        { id: 7, qty: 2 },
      ],
    },
    {
      cityId: 2,
      storage: [{ id: 1, qty: 5 }],
    },
    {
      cityId: 3,
      storage: [],
    },
  ]);
  const [cityStorages, setCityStorages] = useState<cityStorage[]>([
    {
      cityId: 1,
      storage: [
        {
          id: 1,
          priceStats: [10, 15, 18, 13, 15, 18, 18],
          maxStep: 5,
          minPrice: 10,
          maxPrice: 40,
        },
        {
          id: 2,
          priceStats: [12, 13, 14, 15, 16, 11, 18],
          maxStep: 7,
          minPrice: 5,
          maxPrice: 70,
        },
        {
          id: 3,
          priceStats: [25, 28, 31, 27, 23, 20, 25],
          maxStep: 8,
          minPrice: 15,
          maxPrice: 50,
        },
      ],
    },
  ]);
  const [money, setMoney] = useState<number>(1000);
  const [days, setDays] = useState<number>(1);
  const [transportOrders, setTransportOrders] = useState<transportOrder[]>([]);
  const [orderId, setOrderId] = useState<number>(1);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goods: good[] = [
    { id: 1, title: "Пиво" },
    { id: 2, title: "Молоко" },
    { id: 3, title: "Пшеница" },
    { id: 4, title: "Грибы" },
    { id: 5, title: "Клевер" },
    { id: 6, title: "Лук" },
    { id: 7, title: "Виноград" },
    { id: 8, title: "Орехи" },
    { id: 9, title: "Вилы" },
    { id: 10, title: "Доски" },
    { id: 11, title: "Коса" },
    { id: 12, title: "Лопата" },
    { id: 13, title: "Топор" },
    { id: 14, title: "Кирка" },
  ];

  const getStorageByCity = () => {
    const store = storages.find((storage) => storage.cityId === currentCityId);
    return store ? store.storage : [];
  };

  const getCityStorageByCity = () => {
    const store = cityStorages.find(
      (storage) => storage.cityId === currentCityId
    );
    return store ? store.storage : [];
  };

  const sellGoods = (goodId: number, qty: number) => {
    const storagesNew = [...storages];
    let moneyNew = money;

    const index = storagesNew.findIndex((storage) => {
      return storage.cityId === currentCityId;
    });

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex((good) => {
        return good.id === goodId;
      });

      if (goodIndex > -1) {
        const currentCityStorage = getCityStorageByCity();

        const cityGoodIndex = currentCityStorage.findIndex((good) => {
          return good.id === goodId;
        });

        if (cityGoodIndex > -1) {
          const price =
            currentCityStorage[cityGoodIndex].priceStats[
              currentCityStorage[cityGoodIndex].priceStats.length - 1
            ];

          if (storagesNew[index].storage[goodIndex].qty >= qty) {
            storagesNew[index].storage[goodIndex].qty -= qty;
            moneyNew += qty * price;

            if (storagesNew[index].storage[goodIndex].qty === 0) {
              removeProduct(storagesNew[index].storage[goodIndex].id);
            }

            setMoney(moneyNew);
          }
        }
      }
    }

    setStorages(storagesNew);
  };

  const getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));

  const updateCityStorages = () => {
    const newCityStorages = [...cityStorages];

    newCityStorages.forEach((cityStorage) => {
      cityStorage.storage.forEach((goodData) => {
        const priceChangeSign = getRandomInt(2) ? 1 : -1;
        const priceChangeValue =
          getRandomInt(goodData.maxStep) * priceChangeSign;
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

  const liveProcess = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      updateCityStorages();
      updateTransportOrders();
      setDays((days) => days + 1);
    }, 2000);
  };

  useEffect(() => {
    liveProcess();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getCityStorage = () => {
    const store = cityStorages.find(
      (storage) => storage.cityId === currentCityId
    );
    return store ? store.storage : [];
  };

  const createTransportOrder = (targetCityId: number) => {
    const newOrders = [...transportOrders];
    const storage = getStorageByCity();
    const goodIndex = storage.findIndex((good) => good.id === selectedGoodId);

    if (goodIndex > -1) {
      newOrders.push({
        id: orderId,
        fromCityId: currentCityId,
        targetCityId,
        goodId: selectedGoodId,
        qty: storage[goodIndex].qty,
        days: 1,
      });

      setOrderId(orderId + 1);
      removeProduct(selectedGoodId);
      setTransportOrders(newOrders);
    }
  };

  const removeProduct = (productId: number) => {
    const storagesNew = storages;

    const index = storagesNew.findIndex((storage) => {
      return storage.cityId === currentCityId;
    });

    if (index > -1) {
      const productIndex = storagesNew[index].storage.findIndex((product) => {
        return product.id === productId;
      });

      if (productIndex > -1) {
        storagesNew[index].storage.splice(productIndex, 1);
      }
    }

    setStorages(storagesNew);
  };

  const buyGoods = (goodId: number, qty: number, price: number) => {
    const totalPrice = qty * price;

    if (money >= totalPrice) {
      const storagesNew = storages;

      const index = storagesNew.findIndex((storage) => {
        return storage.cityId === currentCityId;
      });

      if (index > -1) {
        const goodIndex = storagesNew[index].storage.findIndex((good) => {
          return good.id === goodId;
        });

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

      setStorages(storagesNew);
      setMoney(money - totalPrice);
    }
  };

  const acceptOrder = (order: transportOrder) => {
    setTransportOrders((orders) => {
      const newOrders = [...orders];

      const index = newOrders.findIndex((o) => {
        return o.id === order.id;
      });

      if (index > -1) {
        newOrders.splice(index, 1);
      }

      return newOrders;
    });

    const storagesNew = storages;

    const index = storagesNew.findIndex((storage) => {
      return storage.cityId === order.targetCityId;
    });

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex((good) => {
        return good.id === order.goodId;
      });

      if (goodIndex > -1) {
        storagesNew[index].storage[goodIndex].qty += order.qty;
      } else {
        storagesNew[index].storage.push({
          id: order.goodId,
          qty: order.qty,
        });
      }
    }

    setStorages(storagesNew);
  };

  return (
    <div className="app">
      <h1 className="app-name">Спекулянтик</h1>

      <Cities currentCityId={currentCityId} onChange={setcurrentCityId} />

      <div className="content">
        <div className="column">
          <div className="storage">
            <Storage
              currentCityId={currentCityId}
              storage={getStorageByCity()}
              selectedGoodId={selectedGoodId}
              goods={goods}
              onSelectGood={setSelectedGoodId}
              onSell={sellGoods}
              onTransport={createTransportOrder}
            />
          </div>
          <div className="transportations">
            <Transportations
              orders={transportOrders}
              goods={goods}
              onAcceptOrder={acceptOrder}
            />
          </div>
          <div className="stats">
            <Stats days={days} money={money} />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage storage={getCityStorage()} onBuy={buyGoods} />
          </div>
        </div>
      </div>
    </div>
  );
};
