import React from "react";

import { CarriageItem } from "../../Carriage.types";
import cn from "./CarriageItem.module.pcss";

import CarImg from "../../../../assets/img/car-img.png";
import CarriageItemProps from "./CarriageItem.types";

const CarriageItem = (props: CarriageItemProps): React.ReactElement => {
  const {
    distance,
    crew_id,
    car_color,
    car_mark,
    car_model,
    car_number,
    componentView = "item",
  } = props;
  switch (componentView) {
    case "item":
      return (
        <div className={cn["wrapper"]}>
          <img src={CarImg} className={cn["img"]} />
          <div>
            <span className={cn["mark-text"]}>{car_mark}</span>
            <span className={cn["color-text"]}>{car_color}</span>
          </div>
          <span className={cn["distance-text"]}>{distance + "м"}</span>
        </div>
      );
    case "solo":
      return (
        <div className={cn["solo-item-wrapper"]}>
          <img src={CarImg} className={cn["img"]} />
          <div>
            <span className={cn["mark-text"]}>{car_mark}</span>
            <span className={cn["color-text"]}>{car_color}</span>
            <span className={cn["car-number-text"]}>{car_number}</span>
          </div>
          <span className={cn["distance-text"]}>{distance + "м"}</span>
        </div>
      );
  }
};

export default CarriageItem;
