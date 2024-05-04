import { FC, useState } from "react";

import { good, storage } from "../../types";

import { Cities } from "../Cities/Cities";
import { Storage } from "../Storage/Storage";
import { Transportations } from "../Transportations/Transportations";
import { Stats } from "../Stats/Stats";
import { CityStorage } from "../CityStorage/CityStorage";

import "./App.scss";

export const App: FC = () => {
  const [currentCity, setCurrentCity] = useState<number>(1);
  const [selectedGood, setSelectedGood] = useState<number | null>(1);
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

  const liveProcess = () => {
    setTimeout(() => {
      setDays(days + 1);
    }, 5000);
  };

  liveProcess();

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
              selectedGood={selectedGood}
              goods={goods}
              onSelectGood={(goodId: number) => {
                setSelectedGood(goodId);
              }}
              onSell={(id, qty) => {
                sellGoods(id, qty);
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
            <CityStorage />
          </div>
        </div>
      </div>
    </div>
  );
};
