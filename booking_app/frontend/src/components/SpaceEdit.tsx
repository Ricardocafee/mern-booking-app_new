import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Switch from "react-switch";
import BedroomModal from "./Room/BedroomModal";
import { propertyRooms } from "../config/property-options-config";
import { generateInitialRoomCounters } from "../config/RoomUtils";
import { PropertyFormData } from "../forms/ManagePropertyForm/ManagePropertyForm";
import { useFormContext } from "react-hook-form";
import ImageCarousel from "../components/ImageCarousel";

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
    imageFiles: FileList;
}

const SpaceEdit = () => {
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
    const [selectedSubRoomIndex, setSelectedSubRoomIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const initialRoomCounters: RoomSchema[] = generateInitialRoomCounters();
    const { watch, register, setValue, formState: { errors }, } = useFormContext<PropertyFormData>();
    let indexFound = -1;


    const handleCarouselDataChange = (data: string, index: number) => {
        const existingImageUrls = watch(`roomsDetails.${index}.imageUrls`);
        setValue(`roomsDetails.${index}.imageUrls`, existingImageUrls.filter((url)=> url !== data));
    };

    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const handleRoomClick = (index: number, subindex: number) => {
        // If clicking on the same room, close it
    if (selectedRoomIndex === index && selectedSubRoomIndex === subindex) {
        setSelectedRoomIndex(null);
        setSelectedSubRoomIndex(null);
    } else {
        setSelectedRoomIndex(index);
        setSelectedSubRoomIndex(subindex);
    }
    };


    const toggleBathroomAttachment: (checked: boolean, index_: number) => void = (checked, index_) => {
        const roomDetail = watch("roomsDetails");
        const updatedRooms: RoomDetails[] = [...roomDetail];

        console.log("Index found bath", index_);
        if (index_ !== -1) {
            updatedRooms[index_].bathroomIncluded = checked;
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

            try {
                indexFound = roomDetail.findIndex((room: RoomDetails) => 
                    room.type === type && room.counter === (selectedSubRoomIndex !== null ? selectedSubRoomIndex + 1 : 1)
                );
                if (indexFound === -1) {
                    indexFound = roomDetail.findIndex((room: RoomDetails) => room.type === type);
                }
            } catch (error) {
                console.error("An error occurred while finding index:", error);
                // If an error occurred, handle the fallback logic here
                indexFound = roomDetail.findIndex((room: RoomDetails) => room.type === type);
            }   

            const aux = indexFound    

            return (
                
                <div key={`${type.slice(0, -1)}${roomIndex !== undefined ? `_${roomIndex}` : ''}`} className="border border-gray-400 p-4 mb-3 rounded-md">
                    <div className="font-semibold flex justify-between cursor-pointer" onClick={() => handleRoomClick(index, roomIndex !== undefined ? roomIndex : -1)}>
                        {`${type.slice(0, -1)}${roomIndex !== undefined ? ` ${roomIndex + 1}` : ''}`}
                        <div className="ml-auto p-1">{selectedRoomIndex === index && (selectedSubRoomIndex === roomIndex || roomIndex === undefined) ? <FaAngleUp /> : <FaAngleDown />}</div>
                    </div>
                    {selectedRoomIndex === index && (selectedSubRoomIndex === roomIndex || roomIndex === undefined) && (
                        
                        <div className="mt-3">
                            <div className="flex items-center justify-between">
                                <label>
                                {roomDetail[indexFound].imageUrls.length === 0 && (
                                <span>Add photos for {type}</span>
                                )}
                                {roomDetail[indexFound].imageUrls.length > 0 && (
                                    <div className="w-[340px]">
                                        <ImageCarousel imageUrls={roomDetail[indexFound].imageUrls} isHovered={true} Delete={true} indexFound={indexFound} onCarouselDataChange={handleCarouselDataChange}/>                    
                                    </div>
                                    )
                                }
                                </label>
                                <div className="rounded-md text-sm border border-black p-2 font-semibold text-gray-900 hover:bg-gray-100 transition cursor-pointer">
                                <label htmlFor={`file-upload-${type}`} className="cursor-pointer">
                                Upload photos
                                
                                {/* File input */}
                                <input                   
                                    id={`file-upload-${type}`}
                                    type="file"                                   
                                    multiple
                                    accept="image/*"
                                    className="cursor-pointer absolute opacity-0" 
                                    {...register(`roomsDetails.${indexFound}.imageFiles`)}
                                />
                            </label>
                            </div>
                                
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
                                    {console.log("Index ofun here", indexFound)};
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
                                        id={`material-switch-${indexFound}`}
                                        onChange={(checked) => toggleBathroomAttachment(checked, aux)}
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
