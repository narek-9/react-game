import { FC, useState } from "react";

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
  onSelectGood: (goodId: number) => void;
  onSell: (goodId: number, qty: number) => void;
  onTransport: (targetCityId: number) => void;
}

export const Storage: FC<IStorageProps> = ({
  currentCityId,
  storage,
  selectedGoodId,
  goods,
  onSelectGood,
  onSell,
  onTransport,
}) => {
  const [qty, setQty] = useState<number>(0);
  const [targetCityId, setTargetCityId] = useState<number>(1);

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
                      (selectedGoodId === item.id ? " selected" : "")
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

        {selectedGoodId ? (
          <>
            <div className="sell-panel">
              <div>{findFoodById(selectedGoodId)}</div>
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
                    onSell(selectedGoodId, qty);
                  }}
                >
                  Продать
                </button>
              </div>
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
                  <option value={1}>Город 1</option>
                  <option value={2}>Город 2</option>
                  <option value={3}>Город 3</option>
                </select>
              </div>
              <div className="controls">
                <button
                  className="button"
                  onClick={() => {
                    onTransport(targetCityId);
                  }}
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
