import { CarriageItem } from "../../Carriage.types";

export default interface CarriageItemProps extends CarriageItem {
  componentView?: "item" | "solo";
}
