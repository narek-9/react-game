import { FC, useState } from "react";

import { cities } from "../../cities";

import "./Storage.scss";

interface IStorageProps {
  currentCityId: number;
  storage: {
    id: number;
    qty: number;
  }[];
  selectedGoodId: number;
  goods: {
    id: number;
    title: string;
  }[];
  selectedProductPrice: number;
  onSelectGood: (goodId: number) => void;
  onSell: (goodId: number, qty: number, getTotalPrice: number) => void;
  onTransport: (targetCityId: number) => void;
}

export const Storage: FC<IStorageProps> = ({
  currentCityId,
  storage,
  selectedGoodId,
  goods,
  selectedProductPrice,
  onSelectGood,
  onSell,
  onTransport,
}) => {
  const [qty, setQty] = useState<number>(0);
  const [targetCityId, setTargetCityId] = useState<number>(1);

  const findFoodById = (itemId: number) => {
    return goods.find((item) => item.id === itemId)?.title;
  };

  const getTotalPrice = () => {
    return Math.round(selectedProductPrice * qty * 0.9);
  };

  return (
    <div>
      <h2 className="title">Мой склад</h2>

      <div className="panel">
        <ul className="goods">
          {Array(8)
            .fill(0)
            .map((_, index) => {
              if (storage[index]) {
                const item = storage[index];

                return (
                  <li
                    key={index}
                    className={
                      "good-item item-" +
                      item.id +
                      (selectedGoodId === item.id ? " selected" : "")
                    }
                    onClick={() => onSelectGood(item.id)}
                  >
                    <span className="good-description">{item.qty} шт.</span>
                  </li>
                );
              } else {
                return <li className="good-item no-item" key={index}></li>;
              }
            })}
        </ul>

        {selectedGoodId ? (
          <>
            <div className="sell-panel">
              <div className="sell-panel-content">
                <div>{findFoodById(selectedGoodId) || "Unknown"}</div>
                <div className="controls">
                  <input
                    type="text"
                    className="input"
                    value={qty}
                    maxLength={3}
                    onChange={(e) => {
                      setQty(parseInt(e.target.value) || 0);
                    }}
                  />
                  шт.
                  <button
                    className="button"
                    onClick={() => {
                      onSell(selectedGoodId, qty, getTotalPrice());
                    }}
                    disabled={!qty || !selectedProductPrice}
                  >
                    Продать
                  </button>
                </div>
              </div>
              {qty && selectedProductPrice ? (
                <div className="sell-panel-info">
                  По цене {selectedProductPrice} x {qty} шт, налог: 10%. Итого:{" "}
                  {getTotalPrice()}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="order-panel">
              <div>
                <select
                  className="select-city"
                  value={targetCityId}
                  onChange={(e) => {
                    setTargetCityId(parseInt(e.currentTarget.value, 10));
                  }}
                >
                  {cities.map((city) => {
                    return (
                      <option
                        disabled={city.id === currentCityId}
                        value={city.id}
                        key={city.id}
                      >
                        {city.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="controls">
                <button
                  className="button"
                  onClick={() => {
                    onTransport(targetCityId);
                  }}
                  disabled={targetCityId === currentCityId}
                >
                  Перевезти
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
