import { FC } from "react";

import { deposit } from "../../types";

import "./Bank.scss";

interface IBankProps {
  deposits: deposit[];
}

export const Bank: FC<IBankProps> = ({ deposits }) => {
  return (
    <div>
      <h2 className="title">Банк</h2>

      <div className="panel">
        {deposits.map((deposit) => {
          return (
            <div className="good-item-wrapper" key={deposit.id}>
              <div className="good-item-description">
                <div className={"good-item item-deposit"} />
              </div>
              <div className="good-item-deposit-info">
                <div>
                  <div className="header">Сумма: {deposit.amount}</div>
                  <div className="days">
                    Дней до получения процента: {deposit.days}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
