import { useFormContext } from "react-hook-form";
import { propertyRooms } from "../../config/property-options-config";
import { PropertyFormData } from "../../forms/ManagePropertyForm/ManagePropertyForm";
import Counter from "../Counter";
import { generateInitialRoomCounters } from "../../config/RoomUtils";

export type RoomSchema = {
  type: string;
  counter: number;
};

export type BedType = {
  type: string;
  counter: number;
};

export type RoomDetails = {
  type: string;
  counter: number;
  beds: BedType[];
  bathroomIncluded: boolean;
  imageUrls: string[];
};

const RoomCounter = () => {
  const { setValue, watch } = useFormContext<PropertyFormData>();
  const initialRoomCounters: RoomSchema[] = generateInitialRoomCounters();

  const handleCounterChange = (index: number, value: number, type: string) => {
    let roomDetail = watch("roomsDetails");

    if (!roomDetail) {
      roomDetail = [];
    }

    let updatedRooms: RoomDetails[] = [...roomDetail];

    // Update existing room counter or remove if counter is 0
    const existingRooms = updatedRooms.filter(
      (room: RoomDetails) => room.type === type
    );
    const existingRoomsCount = existingRooms.length;

        // Update counter regardless of room changes

    initialRoomCounters[index].counter = value;
    setValue("roomsCounter", initialRoomCounters);

    if (value === 0) {
      // Remove all rooms of this type
      updatedRooms = updatedRooms.filter(
        (room: RoomDetails) => room.type !== type
      );
    } else if (existingRoomsCount < value) {
      // Add new rooms if counter is greater than existing rooms
      for (let i = existingRoomsCount + 1; i <= value; i++) {
        const newRoom: RoomDetails = {
          type: type,
          counter: i,
          beds: [],
          bathroomIncluded: false,
          imageUrls: [],
        };
        updatedRooms.push(newRoom);
      }
    } else if (existingRoomsCount > value) {
      // Remove excess rooms if counter is less than existing rooms
      const roomsToRemove = existingRooms.slice(value);
      updatedRooms = updatedRooms.filter(
        (room: RoomDetails) =>
          room.type !== type ||
          !roomsToRemove.some((r) => r.counter === room.counter)
      );
    }

    setValue("roomsDetails", updatedRooms);
    const asdas = watch("roomsCounter")
    console.log("Counterssss", asdas)
  


  };

  return (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
    {propertyRooms.map((room, index) => {
      // Ensure roomCounter exists, if not create one with counter value 0
      const roomCounterIndex = initialRoomCounters.findIndex(counter => counter.type === room);
      if (roomCounterIndex === -1) {
        initialRoomCounters.push({ type: room, counter: 0 });
      }

      return (
        <label
          key={index}
          className="text-sm flex gap-1 text-gray-700"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="flex" style={{ width: "130px" }}>
            {room}
          </div>
          
          <Counter
            counter={initialRoomCounters[index]?.counter || 0}
            setCounter={(value) => handleCounterChange(index, value, room)}
          />
        </label>
      );
    })}
  </div>
);

};

export default RoomCounter;
