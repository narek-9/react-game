import { FC } from "react";

import "./Storage.scss";

interface IStorageProps {
  currentCity: number;
  storage: {
    id: number;
    qty: number;
  }[];
  goods: {
    id: number;
    title: string;
  }[];
}

export const Storage: FC<IStorageProps> = ({ currentCity, storage, goods }) => {
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
              <li className={"good-item " + "item-" + item.id} key={item.id}>
                <span className="good-description">{item.qty} шт.</span>
              </li>
            );
          })}

          {getEmptyCells()}
        </ul>
      </div>
    </div>
  );
};
