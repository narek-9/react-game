import { FC } from "react";

import { city } from "../../types/index";

import "./Cities.scss";

interface ICitiesProps {
  currentCity: number;
  onChange: (city: number) => void;
}

export const Cities: FC<ICitiesProps> = ({ currentCity, onChange }) => {
  const cities: city[] = [
    { id: 1, title: "Город 1" },
    { id: 2, title: "Город 2" },
    { id: 3, title: "Город 3" },
  ];

  return (
    <div className="cities-list">
      {cities.map((city) => {
        return (
          <a
            className={"city " + (currentCity === city.id ? "active" : "")}
            href=""
            onClick={(e) => {
              e.preventDefault();
              onChange(city.id);
            }}
          >
            {city.title}
          </a>
        );
      })}
    </div>
  );
};
