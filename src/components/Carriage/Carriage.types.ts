export default interface CarriageProps {
  className?: string;
  carriageCars?: CarriageItem[];
}

export interface CarriageItem {
  crew_id: number;
  car_mark: string;
  car_model: string;
  car_color: string;
  car_number: string;
  driver_name: string;
  driver_phone: string;
  distance: 600;
}
