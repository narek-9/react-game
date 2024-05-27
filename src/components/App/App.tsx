import { FC } from "react";

import { useAppLogic } from "../hooks/useAppLogic";
import { goods } from "../../config";
import { cityStorage, storage } from "../../types";

import { Cities } from "../Cities/Cities";
import { Storage } from "../Storage/Storage";
import { Transportations } from "../Transportations/Transportations";
import { Stats } from "../Stats/Stats";
import { CityStorage } from "../CityStorage/CityStorage";
import { Bank } from "../Bank/Bank";

import "./App.scss";

export const App: FC = () => {
  const {
    currentCityId,
    playerStorages,
    selectedGoodId,
    transportOrders,
    days,
    money,
    deposits,
    cityStorages,
    setcurrentCityId,
    setSelectedGoodId,
    getCurrentStorage,
    getSelectedProductPrice,
    sellGoods,
    createTransportOrder,
    acceptOrder,
    buyGoods,
  } = useAppLogic();

  return (
    <div className="app">
      <h1 className="app-name">Спекулянтик</h1>

      <Cities currentCityId={currentCityId} onChange={setcurrentCityId} />

      <div className="content">
        <div className="column">
          <div className="storage">
            <Storage
              currentCityId={currentCityId}
              storage={getCurrentStorage<storage>(
                playerStorages,
                currentCityId
              )}
              selectedGoodId={selectedGoodId}
              goods={goods}
              selectedProductPrice={getSelectedProductPrice()}
              onSelectGood={setSelectedGoodId}
              onSell={(id: number, qty: number, totalPrice: number) =>
                sellGoods(id, qty, totalPrice)
              }
              onTransport={createTransportOrder}
            />
          </div>
          <div className="transportations">
            <Transportations
              orders={transportOrders}
              goods={goods}
              onAcceptOrder={acceptOrder}
            />
          </div>
          <div className="stats">
            <Stats days={days} money={money} />
          </div>
          <div className="deposits">
            <Bank deposits={deposits} />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage
              storage={getCurrentStorage<cityStorage>(
                cityStorages,
                currentCityId
              )}
              onBuy={buyGoods}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
