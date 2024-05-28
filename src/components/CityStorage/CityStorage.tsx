import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartOptions,
} from "chart.js";

import StorageItem from "./components/StorageItem";

import "./CityStorage.scss";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface ICityStorageProps {
  storage: {
    id: number;
    priceStats: number[];
    maxStep: number;
    minPrice: number;
    maxPrice: number;
  }[];
  onBuy: (goodId: number, qty: number, price: number) => void;
}

export const CityStorage: FC<ICityStorageProps> = ({ storage, onBuy }) => {
  const options: ChartOptions<"line"> = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        caretSize: 3,
        backgroundColor: "#8d6048",
        borderColor: "#8d6048",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: () => "",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
      x: {
        display: false,
      },
    },
  };

  const getGoodData = (priceStats: number[]) => {
    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "Цена за шт.",
          data: priceStats,
          fill: false,
          backgroundColor: "#8d6048",
          borderColor: "#8d604844",
        },
      ],
    };
  };

  return (
    <div>
      <h2 className="title">Городской склад</h2>

      <div className="panel">
        <div className="city-goods">
          {storage.map((good) => {
            return (
              <div className="good-item-wrapper" key={good.id}>
                <StorageItem good={good} onBuy={onBuy} />
                <div className="good-item-stats">
                  <Line data={getGoodData(good.priceStats)} options={options} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
