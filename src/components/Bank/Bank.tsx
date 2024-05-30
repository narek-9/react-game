import { FC, useState } from "react";

import { deposit } from "../../types";

import "./Bank.scss";

interface IBankProps {
  deposits: deposit[];
  onOpenDeposit: (amount: number) => void;
  money: number;
}

export const Bank: FC<IBankProps> = ({ deposits, onOpenDeposit, money }) => {
  const [amount, setAmount] = useState<number>(0);

  return (
    <div>
      <h2 className="title">Банк</h2>

      <div className="panel">
        <div className="sell-panel">
          <div className="sell-panel-content">
            <div>Сумма</div>
            <div className="controls">
              <input
                type="text"
                maxLength={4}
                value={amount}
                onChange={(e) => {
                  setAmount(parseInt(e.target.value) || 0);
                }}
                className="input"
              />
              <button
                className="button"
                onClick={() => {
                  onOpenDeposit(amount);
                }}
                disabled={!amount || money < amount}
              >
                Открыть
              </button>
            </div>
          </div>
        </div>
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
                    Дней до закрытия: {deposit.days}
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
