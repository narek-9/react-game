import { FC, useEffect, useState } from "react";

import { cityStorage, good, storage } from "../../types";

import { Cities } from "../Cities/Cities";
import { Storage } from "../Storage/Storage";
import { Transportations } from "../Transportations/Transportations";
import { Stats } from "../Stats/Stats";
import { CityStorage } from "../CityStorage/CityStorage";

import "./App.scss";

export const App: FC = () => {
  const [currentCity, setCurrentCity] = useState<number>(1);
  const [selectedGoodId, setSelectedGoodId] = useState<number>(1);
  const [storages, setStorages] = useState<storage[]>([
    {
      cityId: 1,
      storage: [
        {
          id: 1,
          qty: 10,
        },
        {
          id: 2,
          qty: 20,
        },
        {
          id: 3,
          qty: 204,
        },
        {
          id: 4,
          qty: 200,
        },
        {
          id: 5,
          qty: 120,
        },
        {
          id: 6,
          qty: 10,
        },
        {
          id: 7,
          qty: 2,
        },
      ],
    },
    {
      cityId: 2,
      storage: [
        {
          id: 1,
          qty: 5,
        },
      ],
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

  const goods: good[] = [
    {
      id: 1,
      title: "Пиво",
    },
    {
      id: 2,
      title: "Молоко",
    },
    {
      id: 3,
      title: "Пшеница",
    },
    {
      id: 4,
      title: "Грибы",
    },
    {
      id: 5,
      title: "Клевер",
    },
    {
      id: 6,
      title: "Лук",
    },
    {
      id: 7,
      title: "Виноград",
    },
    {
      id: 8,
      title: "Орехи",
    },
    {
      id: 9,
      title: "Вилы",
    },
    {
      id: 10,
      title: "Доски",
    },
    {
      id: 11,
      title: "Коса",
    },
    {
      id: 12,
      title: "Лопата",
    },
    {
      id: 13,
      title: "Топор",
    },
    {
      id: 14,
      title: "Кирка",
    },
  ];

  const [transportOrders, setTransportOrders] = useState<
    {
      targetCityId: number;
      goodId: number;
      qty: number;
      days: number;
    }[]
  >([]);

  const getStorageByCity = () => {
    const store = storages.find((storage) => storage.cityId === currentCity);

    if (store) {
      return store.storage;
    } else {
      return [];
    }
  };

  const sellGoods = (goodId: number, qty: number) => {
    const storagesNew = storages;
    let moneyNew = money;

    const index = storagesNew.findIndex((storage) => {
      return storage.cityId === currentCity;
    });

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex((good) => {
        return good.id === goodId;
      });

      if (goodIndex > -1) {
        storagesNew[index].storage[goodIndex].qty -= qty;
        moneyNew += qty * 10;
        setMoney(moneyNew);
      }
    }

    setStorages(storagesNew);
  };

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const updateCityStorages = () => {
    const newCityStorages = cityStorages;

    for (let cityIndex = 0; cityIndex < newCityStorages.length; cityIndex++) {
      const storage = newCityStorages[cityIndex].storage;

      for (let goodIndex = 0; goodIndex < storage.length; goodIndex++) {
        const goodData = storage[goodIndex];
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

        for (let i = 0; i < goodData.priceStats.length - 1; i++) {
          goodData.priceStats[i] = goodData.priceStats[i + 1];
        }

        goodData.priceStats[goodData.priceStats.length - 1] = newPrice;
        newCityStorages[cityIndex].storage[goodIndex] = goodData;
      }
    }

    setCityStorages(newCityStorages);
  };

  const liveProcess = () => {
    setInterval(() => {
      updateCityStorages();
      setDays((days) => days + 1);
    }, 2000);
  };

  useEffect(() => {
    liveProcess();
  }, []);

  const getCityStorage = () => {
    const store = cityStorages.find(
      (storage) => storage.cityId === currentCity
    );

    if (store) {
      return store.storage;
    } else {
      return [];
    }
  };

  const createTrasnportOrder = (targetCityId: number) => {
    const newOrders = transportOrders;

    const storage = getStorageByCity();

    const goodIndex = storage.findIndex((good) => good.id === selectedGoodId);

    if (goodIndex > -1) {
      newOrders.push({
        targetCityId,
        goodId: selectedGoodId,
        qty: storage[goodIndex].qty,
        days: 30,
      });

      setTransportOrders(newOrders);
    }
  };

  const buyGoods = (goodId: number, qty: number, price: number) => {
    const totalPrice = qty * price;

    if (money >= totalPrice) {
      const storagesNew = storages;

      const index = storagesNew.findIndex((storage) => {
        return storage.cityId === currentCity;
      });

      if (index > -1) {
        const goodIndex = storagesNew[index].storage.findIndex((good) => {
          return good.id === goodId;
        });

        if (goodIndex > -1) {
          storagesNew[index].storage[goodIndex].qty += qty;
        } else {
          storagesNew[index].storage.push({
            id: goodId,
            qty,
          });
        }
      }

      setStorages(storagesNew);
      setMoney(money - totalPrice);
    }
  };

  return (
    <div className="app">
      <h1 className="app-name">Спекулянтик</h1>

      <Cities
        currentCity={currentCity}
        onChange={(city: number) => {
          setCurrentCity(city);
        }}
      />

      <div className="content">
        <div className="column">
          <div className="storage">
            <Storage
              currentCity={currentCity}
              storage={getStorageByCity()}
              selectedGoodId={selectedGoodId}
              goods={goods}
              onSelectGood={(goodId: number) => {
                setSelectedGoodId(goodId);
              }}
              onSell={(id, qty) => {
                sellGoods(id, qty);
              }}
              onTransport={(targetCityId: number) => {
                createTrasnportOrder(targetCityId);
              }}
            />
          </div>
          <div className="transportations">
            <Transportations />
          </div>
          <div className="stats">
            <Stats days={days} money={money} />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage
              storage={getCityStorage()}
              onBuy={(goodId, qty, price) => {
                buyGoods(goodId, qty, price);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
