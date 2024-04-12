import { useFormContext } from "react-hook-form";
import { propertyRooms } from "../../config/property-options-config";
import { PropertyFormData } from "./ManagePropertyForm";
import CounterRoom from "../../components/CounterRoom";
import { useEffect, useState } from "react";

export type RoomSchema = {
    type: string;
    counter: number;
};


const RoomsSection = () => {

    const { setValue,  watch} = useFormContext<PropertyFormData>();

    const watchedRoomsCounter = watch("roomsCounter");

    const initialRoomCounters: RoomSchema[] = watchedRoomsCounter && watchedRoomsCounter.length
    ? watchedRoomsCounter
    : propertyRooms.map(roomType => ({
          type: roomType,
          counter: 0
      }));

    const [roomCounters, setRoomCounters] = useState<RoomSchema[]>(initialRoomCounters);

    useEffect(() => {
        setValue("roomsCounter", roomCounters);
    }, [roomCounters, setValue]);

    const handleCounterChange = (index: number, value: number) => {
        const newCounters: RoomSchema[] = [...initialRoomCounters]
        newCounters[index].counter = value;
        setRoomCounters(newCounters);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Rooms and Spaces</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {propertyRooms.map((room, index) => (
                    <label key={index} className="text-sm flex gap-1 text-gray-700" style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ minWidth: "100px" }}> {/* Use minWidth instead of width for responsiveness */}
                            {room}
                        </div>
                        <CounterRoom counter={initialRoomCounters[index].counter} setCounter={(value) => handleCounterChange(index, value)} />
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RoomsSection;
