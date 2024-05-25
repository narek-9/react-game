import { FC } from "react";

import { transportOrder, good } from "../../types";

import "./Transportations.scss";
import { cities } from "../../cities";

interface ITransportationsProps {
  orders: transportOrder[];
  goods: good[];
}

export const Transportations: FC<ITransportationsProps> = ({
  orders,
  goods,
}) => {
  const findGoodById = (goodId: number) => {
    return goods.find((good) => {
      return good.id === goodId;
    })?.title;
  };

  const getCityNameById = (cityId: number) => {
    return cities.find((city) => {
      return city.id === cityId;
    })?.title;
  };

  return (
    <div className="transportations">
      <h2 className="title">Активные перевозки</h2>

      <div className="panel">
        {orders.map((order, i) => {
          return (
            <div className="good-item-wrapper" key={i}>
              <div className="good-item-description">
                <div className={"good-item item-" + order.goodId} />
              </div>
              <div className="good-item-transport-info">
                <div>
                  <div className="header">{findGoodById(order.goodId)}</div>
                  <div className="path">
                    {getCityNameById(order.fromCityId)} -{" "}
                    {getCityNameById(order.targetCityId)}
                  </div>
                </div>
                <div>
                  <div className="days">Дни: {order.days}</div>
                  <button className="button" disabled={!!order.days}>
                    Получить
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
