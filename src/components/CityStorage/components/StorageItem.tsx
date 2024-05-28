import { FC, useState } from "react";

interface IStorageItemProps {
  good: {
    id: number;
    priceStats: number[];
    maxStep: number;
    minPrice: number;
    maxPrice: number;
  };
  onBuy: (goodId: number, qty: number, price: number) => void;
}

export const StorageItem: FC<IStorageItemProps> = ({ good, onBuy }) => {
  const [number, setNumber] = useState<number>(0);

  return (
    <div className="good-item-description">
      <div className={"good-item item-" + good.id} />

      <input
        className="input-number"
        name={"count" + new Date()}
        autoComplete="new-password"
        value={number}
        maxLength={3}
        onChange={(e) => {
          setNumber(Number(e.currentTarget.value) || 0);
        }}
      />

      <button
        className="button"
        onClick={() => {
          if (number) {
            onBuy(good.id, number, good.priceStats[good.priceStats.length - 1]);
            setNumber(0);
          }
        }}
      >
        Купить
      </button>

      <p className="price-description">
        {good.priceStats[good.priceStats.length - 1]} за шт.
      </p>
    </div>
  );
};

export default StorageItem;
