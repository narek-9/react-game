import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartData,
  ChartOptions,
} from "chart.js";

import "./CityStorage.scss";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export const CityStorage: FC = () => {
  const data: ChartData<"line"> = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: [
      {
        label: "Цена за шт.",
        data: [12, 19, 3, 5, 2, 3, 14],
        fill: false,
        backgroundColor: "#a68156",
        borderColor: "rgba(166, 129, 86, 0.2)",
      },
    ],
  };

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
        backgroundColor: "#44200c",
        borderColor: "#877f72",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: () => "",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2 className="title">Городской склад</h2>

      <div className="panel">
        <div className="city-goods">
          <div className="good-item-wrapper">
            <div className="good-item item-1"></div>
            <div className="good-item-stats">
              <Line data={data} options={options} />
            </div>
          </div>

          <div className="good-item-wrapper">
            <div className="good-item item-2"></div>
            <div className="good-item-stats">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
