import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Switch from "react-switch";
import BedroomModal from "./Room/BedroomModal";
import { propertyRooms } from "../config/property-options-config";
import { generateInitialRoomCounters } from "../config/RoomUtils";
import { PropertyFormData } from "../forms/ManagePropertyForm/ManagePropertyForm";
import { useFormContext } from "react-hook-form";

export type RoomSchema = {
    type: string;
    counter: number;
};

export type BedType = {
    type: string;
    counter: number;
}

export type RoomDetails = {
    type: string;
    counter: number;
    beds: BedType[];
    bathroomIncluded: boolean;
    imageUrls: string[],
}

const SpaceEdit = () => {
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
    const [selectedSubRoomIndex, setSelectedSubRoomIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const initialRoomCounters: RoomSchema[] = generateInitialRoomCounters();
    const { watch, setValue, formState: { errors }, } = useFormContext<PropertyFormData>();

    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const handleRoomClick = (index: number, subindex: number) => {
        setSelectedRoomIndex(prevIndex => (prevIndex === index ? null : index));
        setSelectedSubRoomIndex(prevSubIndex => (prevSubIndex === subindex ? null : subindex));
    };

    const handlePhotoUpload = (roomType: string) => {
        console.log(`Uploaded photo for ${roomType}`);
    };

    const toggleBathroomAttachment: (checked: boolean, indexFound: number) => void = (checked, indexFound) => {
        const roomDetail = watch("roomsDetails");
        const updatedRooms: RoomDetails[] = [...roomDetail];

        if (indexFound !== -1) {
            updatedRooms[indexFound].bathroomIncluded = checked;
            setValue("roomsDetails", updatedRooms);
        }
    };

    const getCounterForRoomType = (roomType: string) => {
        const roomCounter = initialRoomCounters.find((room) => room.type === roomType);
        return roomCounter ? roomCounter.counter : 0;
    };

    const generateRoomLabels = () => {
        const generateRoomLabelJSX = (type:string , index:number, roomIndex?: number) => {
            const roomDetail = watch("roomsDetails");
            let indexFound = -1;

            try {
                indexFound = roomDetail.findIndex((room: RoomDetails) => 
                    room.type === type && room.counter === (selectedSubRoomIndex !== null ? selectedSubRoomIndex + 1 : 1)
                );
            } catch (error) {
                console.error("An error occurred while finding index:", error);
                // If an error occurred, handle the fallback logic here
                indexFound = roomDetail.findIndex((room: RoomDetails) => room.type === type);
            }
            

            return (
                <div key={`${type.slice(0, -1)}${roomIndex !== undefined ? `_${roomIndex}` : ''}`} className="border border-gray-400 p-4 mb-3 rounded-md">
                    <div className="font-semibold flex justify-between cursor-pointer" onClick={() => handleRoomClick(index, roomIndex !== undefined ? roomIndex : -1)}>
                        {`${type.slice(0, -1)}${roomIndex !== undefined ? ` ${roomIndex + 1}` : ''}`}
                        <div className="ml-auto p-1">{selectedRoomIndex === index && (selectedSubRoomIndex === roomIndex || roomIndex === undefined) ? <FaAngleUp /> : <FaAngleDown />}</div>
                    </div>
                    {selectedRoomIndex === index && (selectedSubRoomIndex === roomIndex || roomIndex === undefined) && (
                        <div className="mt-3">
                            <div className="flex items-center justify-between">
                                <label htmlFor="photo-upload">Add photos for {type}:</label>
                                <button
                                    className="rounded-md text-sm border border-black p-2 font-semibold text-gray-900 hover:bg-gray-100 transition"
                                    onClick={() => handlePhotoUpload(type)}
                                >
                                    Upload photos
                                </button>
                            </div>
                            {type === 'Bedrooms' && (
                            <div>
                            <div className="border-b border-gray-300 mt-5"></div>
                            <div className="flex justify-between mt-5">
                                <div>Bed types</div>
                                <u className="font-semibold pr-4 cursor-pointer" onClick={toggleModal}>Edit</u>
                            </div>
                            <div className="border-b border-gray-300 mt-5"></div>
                                <div className="flex justify-between mt-5">
                                    <div>It has an attached private bathroom</div>
                                    <Switch
                                        checked={roomDetail[indexFound].bathroomIncluded}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={30}
                                        checkedIcon={roomDetail[indexFound].bathroomIncluded}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={20}
                                        width={48}
                                        className="react-switch"
                                        id="material-switch"
                                        onChange={(checked) => toggleBathroomAttachment(checked, indexFound)}
                                    />
                                    {errors.roomsDetails?.message && (
                                        <span className="text-red-500 text-sm font-bold">
                                            {errors.roomsDetails?.message}
                                        </span>
                                    )}
                                </div>                           
                            <div className="text-gray-600 text-sm">
                                There is a bathroom attached to the guest room for your exclusive use.
                            </div>
                            </div>
                            )}
                        </div>
                    )}
                </div>
            );
        };

        const roomLabels = propertyRooms.map((type, index) => {
            const counter = getCounterForRoomType(type);
            if (counter === 1) {
                return generateRoomLabelJSX(type, index, undefined);
            } else {
                return Array.from({ length: counter }).map((_, roomIndex) => generateRoomLabelJSX(type, index, roomIndex));
            }
        });

        return roomLabels;
    };

    return (
        <div>
            <div className="mt-9">
                {generateRoomLabels().map((label, index) => (
                    <div key={index}>{label}</div>
                ))}
            </div>
            {isModalOpen && <BedroomModal onClose={toggleModal} ind={selectedRoomIndex}/>}
        </div>
    );
};

export default SpaceEdit;
