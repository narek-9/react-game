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

  return (
    <>
      {storage.map((item) => {
        return (
          <span>
            {item.id}. {findFoodById(item.id)} - {item.qty} шт.
            <br />
          </span>
        );
      })}
      Склад
    </>
  );
};
