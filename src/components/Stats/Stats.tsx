import { FC } from "react";

import { settings } from "../../config";

import "./Stats.scss";

interface IStateProps {
  days: number;
  money: number;
}

export const Stats: FC<IStateProps> = ({ days, money }) => {
  return (
    <div>
      <h2 className="title">Статистика</h2>

      <div className="panel stats-panel">
        <div className="money">
          {money} / {settings.goalMoney}
        </div>
        <div className="days">
          Дни: {days} / {settings.goalDays}
        </div>
      </div>
    </div>
  );
};
