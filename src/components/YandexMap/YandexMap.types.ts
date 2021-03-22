export default interface YandexMapProps {
  setPoint: (point: any) => void;
  point: any;
  setAddress: (address: string) => void;
  address: string;
  defaultMapOption: { center: Coordinates; zoom: number };
  closestPoints: Coordinates[];
  onSearchAddressError: () => void;
  onAddressValid: () => void;
  isError?: boolean;
  className?: string;
}

export type Coordinates = [number, number];
