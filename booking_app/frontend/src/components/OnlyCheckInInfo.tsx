import React from "react";
import { PiClockCounterClockwiseDuotone } from "react-icons/pi";
<PiClockCounterClockwiseDuotone />

const CheckInInformation: React.FC = () => {
  return (
    <div className="flex items-center">
    <PiClockCounterClockwiseDuotone className="mr-2"/>
      <p className="text-gray-800">Information communicated 24 to 48 hours before check-in</p>
    </div>
  );
};

export default CheckInInformation;
