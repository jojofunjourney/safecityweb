import { CityKey } from "@/types/crimeData";

export interface AddressSelection {
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  city: CityKey;
}

export interface OnAddressSelectFunction {
  (selection: AddressSelection): void;
}