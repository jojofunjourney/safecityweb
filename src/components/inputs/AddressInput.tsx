import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddressInputProps {
  address: string;
  setAddress: (address: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ address, setAddress }) => {
  return (
    <div
      className="address-input-container flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
      data-testid="address-input-container"
    >
      <Input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="address-input flex-grow"
        data-testid="address-input"
      />
      <Button
        variant="outline"
        className="current-location-btn sm:w-auto"
        data-testid="current-location-btn"
      >
        <MapPin
          className="current-location-icon mr-2 h-8 w-8"
          data-testid="current-location-icon"
        />{" "}
        Use Current Location
      </Button>
    </div>
  );
};

export default AddressInput;
