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

  return (
    <div>
      <h2 className="title">Мой склад</h2>

      <div className="panel">
        <ul className="goods">
          {Array(8)
            .fill(0)
            .map((i, index) => {
              if (storage[index]) {
                const item = storage[index];

                return (
                  <li
                    key={"storage-item-" + item.id}
                    className={
                      "good-item item-" +
                      item.id +
                      (selectedGood === item.id ? " selected" : "")
                    }
                    onClick={() => onSelectGood(item.id)}
                  >
                    <span className="good-description">{item.qty} шт.</span>
                  </li>
                );
              } else {
                return (
                  <li
                    className="good-item no-item"
                    key={"empty-cell-" + index}
                  ></li>
                );
              }
            })}
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
