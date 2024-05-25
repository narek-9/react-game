import { FC } from "react";

import { cities } from "../../cities";

import "./Cities.scss";

interface ICitiesProps {
  currentCityId: number;
  onChange: (city: number) => void;
}

export const Cities: FC<ICitiesProps> = ({ currentCityId, onChange }) => {
  return (
    <div className="cities-list">
      {cities.map((city) => {
        return (
          <a
            className={"city " + (currentCityId === city.id ? "active" : "")}
            href=""
            onClick={(e) => {
              e.preventDefault();
              onChange(city.id);
            }}
            key={city.id}
          >
            {city.title}
          </a>
        );
      })}
    </div>
  );
};
