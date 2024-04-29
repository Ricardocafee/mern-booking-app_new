// roomCounterUtils.ts

import { useMemo } from "react";
import { propertyRooms } from "../config/property-options-config";
import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "../forms/ManagePropertyForm/ManagePropertyForm";

export type RoomSchema = {
  type: string;
  counter: number;
};

export const generateInitialRoomCounters = () => {
  const { watch } = useFormContext<PropertyFormData>();
  const watchedRoomsCounter = watch("roomsCounter");

  const initialRoomCounters: RoomSchema[] = useMemo(() => {
    if (watchedRoomsCounter && watchedRoomsCounter.length) {
      // If watchedRoomsCounter has values, ensure each type in propertyRooms has a corresponding counter
      const updatedCounters = propertyRooms.map((roomType) => {
        const existingCounter = watchedRoomsCounter.find((room) => room.type === roomType);
        return existingCounter ? existingCounter : { type: roomType, counter: 0 };
      });
      return updatedCounters;
    } else {
      // If watchedRoomsCounter is empty, initialize counters for each type in propertyRooms
      return propertyRooms.map((roomType) => ({
        type: roomType,
        counter: 0,
      }));
    }
  }, [watchedRoomsCounter, propertyRooms]);

  return initialRoomCounters;
};
