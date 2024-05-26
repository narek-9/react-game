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
          priceStats: [12, 13, 14, 13, 12, 13, 13],
          maxStep: 1,
          minPrice: 12,
          maxPrice: 18,
        },
        {
          id: 2,
          priceStats: [15, 16, 16, 15, 14, 13, 12],
          maxStep: 1,
          minPrice: 12,
          maxPrice: 20,
        },
        {
          id: 3,
          priceStats: [8, 9, 10, 11, 10, 9, 10, 11],
          maxStep: 1,
          minPrice: 8,
          maxPrice: 15,
        },

        {
          id: 12,
          priceStats: [15, 17, 15, 16, 18, 20, 21],
          maxStep: 2,
          minPrice: 15,
          maxPrice: 21,
        },
        {
          id: 13,
          priceStats: [20, 23, 26, 24, 27, 25, 24],
          maxStep: 3,
          minPrice: 20,
          maxPrice: 35,
        },
        {
          id: 7,
          priceStats: [30, 35, 40, 38, 37, 42, 47],
          maxStep: 5,
          minPrice: 30,
          maxPrice: 50,
        },
      ],
    },

    {
      cityId: 2,
      storage: [
        {
          id: 1,
          priceStats: [12, 13, 14, 13, 12, 13, 13],
          maxStep: 1,
          minPrice: 9,
          maxPrice: 15,
        },
        {
          id: 2,
          priceStats: [13, 14, 15, 16, 17, 18, 19],
          maxStep: 1,
          minPrice: 13,
          maxPrice: 24,
        },
        {
          id: 3,
          priceStats: [10, 11, 12, 11, 12, 13, 14],
          maxStep: 1,
          minPrice: 10,
          maxPrice: 18,
        },

        {
          id: 6,
          priceStats: [8, 7, 8, 9, 10, 9, 8],
          maxStep: 2,
          minPrice: 6,
          maxPrice: 13,
        },
        {
          id: 12,
          priceStats: [14, 15, 17, 16, 15, 17, 15],
          maxStep: 2,
          minPrice: 14,
          maxPrice: 17,
        },
        {
          id: 14,
          priceStats: [30, 35, 40, 38, 37, 40, 38],
          maxStep: 5,
          minPrice: 25,
          maxPrice: 40,
        },
      ],
    },

    {
      cityId: 3,
      storage: [
        {
          id: 1,
          priceStats: [12, 13, 14, 15, 16, 15, 14],
          maxStep: 1,
          minPrice: 10,
          maxPrice: 20,
        },
        {
          id: 6,
          priceStats: [5, 6, 7, 8, 7, 8, 9],
          maxStep: 1,
          minPrice: 5,
          maxPrice: 10,
        },
        {
          id: 13,
          priceStats: [15, 20, 25, 30, 25, 22, 21],
          maxStep: 5,
          minPrice: 15,
          maxPrice: 40,
        },
        {
          id: 14,
          priceStats: [20, 25, 22, 27, 26, 29, 30],
          maxStep: 5,
          minPrice: 20,
          maxPrice: 35,
        },
        {
          id: 7,
          priceStats: [15, 20, 25, 23, 22, 27, 28],
          maxStep: 5,
          minPrice: 15,
          maxPrice: 40,
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
    { id: 1, title: "Квас" },
    { id: 2, title: "Молоко" },
    { id: 3, title: "Пшеница" },
    { id: 6, title: "Лук" },
    { id: 7, title: "Виноград" },
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

  const sellGoods = (goodId: number, qty: number, totalPrice: number) => {
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

  const liveProcess = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      updateCityStorages();
      updateTransportOrders();
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
        days: 30,
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

  const getSelectedProductPrice = () => {
    const cityStorage = getCityStorage();

    const product = cityStorage.find((product) => {
      return product.id === selectedGoodId;
    });

    if (product && product.priceStats) {
      return product.priceStats[product.priceStats.length - 1];
    }

    return 0;
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
              selectedProductPrice={getSelectedProductPrice()}
              onSelectGood={setSelectedGoodId}
              onSell={(id: number, qty: number, totalPrice: number) =>
                sellGoods(id, qty, totalPrice)
              }
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
