import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { propertyRooms } from "../../config/property-options-config";
import { PropertyFormData } from "./ManagePropertyForm";
import CounterRoom from "../../components/CounterRoom";

export type RoomSchema = {
  type: string;
  counter: number;
};

const RoomsSection = () => {
  const { setValue, watch } = useFormContext<PropertyFormData>();
  const watchedRoomsCounter = watch("roomsCounter");

  const initialRoomCounters: RoomSchema[] = useMemo(() => {
    if (watchedRoomsCounter && watchedRoomsCounter.length) {
      return watchedRoomsCounter;
    } else {
      return propertyRooms.map((roomType) => ({
        type: roomType,
        counter: 0,
      }));
    }
  }, [watchedRoomsCounter, propertyRooms]);

  console.log("Initial", initialRoomCounters);


  const handleCounterChange = (index: number, value: number) => {
    const updatedCounters = [...initialRoomCounters];
    updatedCounters[index].counter = value;
    // Update initialRoomCounters directly
    initialRoomCounters[index].counter = value;
    // Trigger re-render (since initialRoomCounters is not a state)
    setValue("roomsCounter", updatedCounters);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Rooms and Spaces</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Number of rooms
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {propertyRooms.map((room, index) => (
          <label
            key={index}
            className="text-sm flex gap-1 text-gray-700"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ minWidth: "100px" }}>{room}</div>
            <CounterRoom
              counter={initialRoomCounters[index]?.counter || 0}
              setCounter={(value) => handleCounterChange(index, value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
