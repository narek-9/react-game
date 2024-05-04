import { FC, useState } from "react";

import "./Storage.scss";

interface IStorageProps {
  currentCity: number;
  storage: {
    id: number;
    qty: number;
  }[];
  selectedGood: number | null;
  goods: {
    id: number;
    title: string;
  }[];
  onSelectGood: (goodId: number) => void;
  onSell: (goodId: number, qty: number) => void;
}

export const Storage: FC<IStorageProps> = ({
  currentCity,
  storage,
  selectedGood,
  goods,
  onSelectGood,
  onSell,
}) => {
  const [qty, setQty] = useState<number>(0);

  const findFoodById = (itemId: number) => {
    return goods.find((item) => item.id === itemId)?.title;
  };

  const getEmptyCells = () => {
    if (storage.length < 8) {
      return Array(8 - storage.length)
        .fill(0)
        .map((_, index) => {
          return <li className="good-item no-item" key={index + 100}></li>;
        });
    }
  };

  return (
    <div>
      <h2 className="title">Мой склад</h2>

      <div className="panel">
        <ul className="goods">
          {storage.map((item) => {
            return (
              <li
                className={
                  "good-item item-" +
                  item.id +
                  (selectedGood === item.id ? " selected" : "")
                }
                onClick={() => onSelectGood(item.id)}
                key={item.id}
              >
                <span className="good-description">{item.qty} шт.</span>
              </li>
            );
          })}

          {getEmptyCells()}
        </ul>

        {selectedGood ? (
          <div className="sell-panel">
            <div>{findFoodById(selectedGood)}</div>
            <div className="controls">
              <input
                type="text"
                className="input"
                value={qty}
                onChange={(e) => {
                  setQty(parseInt(e.target.value));
                }}
              />
              шт.
              <button
                className="button"
                onClick={() => {
                  onSell(selectedGood, qty);
                }}
              >
                Продать
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
