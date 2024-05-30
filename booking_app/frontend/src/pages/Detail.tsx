import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import ImageFullScreen from "../components/ImageFullScreen";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import ProjectDescription from "../components/PropertyDescription";
import { IoMdStar } from "react-icons/io";
import '../effects/Calendar.css'

import { renderIconByKey } from "../components/Dictionary/DictionaryIcons";
import { renderIconByKeyRule } from "../components/Dictionary/DictionaryIconsRules";
import { renderIconByKeySecurity } from "../components/Dictionary/DictionaryIconsSecurity";
import renderRulesLabel  from "../components/Dictionary/DictionarySecurityLabels";

import { propertyImportant } from "../config/property-options-config";
import { IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { BsFillPeopleFill } from "react-icons/bs";
import { TfiNotepad } from "react-icons/tfi";
import SecurityModal from "../components/SecurityModal";
import { useSearchContext } from "../contexts/SearchContext";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "../effects/Calendar.css";


const Detail = () => {
    const { propertyId } = useParams();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showPropertyInfo, setShowPropertyInfo] = useState(false);


  const onChangeUp = (dates: [Date | null, Date | null] | null) => {
    const [start, end] = dates || [null, null];
    setStartDate(start);
    if (start) {
        setValue("checkIn", start)
    }
    setEndDate(end);
    if (end) {
        setValue("checkOut",end )
    }
  };

    type GuestInfoFormData = {
    checkIn: Date | null;
    checkOut: Date | null;
    adultCount: number;
    childCount: number;
    babyCount: number;
    petCount: number;
    };

    const search = useSearchContext();

    const { watch, setValue } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
            babyCount: search.babyCount,
            petCount: search.petCount,
        }
    });

    const [checkIn, setStartDate] = useState<Date | null>(watch("checkIn"));
    const [checkOut, setEndDate] = useState<Date | null>(watch("checkOut"));

     const handleCheckInChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleCheckOutChange = (date: Date | null) => {
        setEndDate(date);
    };


     // Update state when checkIn or checkOut changes elsewhere
    useEffect(() => {
        setStartDate(checkIn);
        setEndDate(checkOut);
    }, [checkIn, checkOut]);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const renderFacilityTypeLabel = (facilityType: string) => {
    if (facilityType === "BedroomLaundry") {
        return "Bedroom and Laundry";
    } else if (facilityType === "HeatingCooling"){
        return "Heating and Cooling";
    } else if (facilityType === "HomeSecurity"){
        return "Home Security";
    } else if (facilityType === "InternetOffice"){
        return "Internet and Office";
    } else if (facilityType === "LocationFeatures"){
        return "Location Features";
    } else {
        return facilityType;
    }
    };


    const { data: property } = useQuery("fetchPropertyById", () =>
        apiClient.fetchPropertyById(propertyId as string), {
        enabled: !!propertyId,
    });

    

    if (!property) {
        return <></>;
    }

    const handleImageClick = ( index: number) => {
        setCurrentImageIndex(index);
        setIsFullScreen(true);
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsFullScreen(true);
    };

    const openMapModal = () => {
        setShowMap(true);
    };

    const closeMapModal = () => {
        setShowMap(false);
    };

    let count = 0;
    const totalFacilities = property.facilities.reduce((acc, facilityGroup) => {
    return acc + facilityGroup.facilities.filter(facility => facility !== 'false').length;
}, 0);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleFull = () => {
        setShowFullDescription(!showFullDescription);
    };

    const togglePropertyInfo = () => {
        setShowPropertyInfo(!showPropertyInfo);
    };

    const combinedArray = [
    ...property.securityGuests.securityConditions.filter(security => security.allowed === 'allowed'),
    ...property.securityGuests.securityDevices.filter(security => security.allowed === 'allowed'),
    ...property.securityGuests.propertyInfo.filter(security => security.allowed === 'allowed')
];


    return (
        <div>
         {showModal && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent background
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowX: 'hidden',
              }}
              onClick={toggleModal} // Close modal when clicking outside
            >
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  maxWidth: '80%',
                  maxHeight: '80%',
                  overflow: 'auto',
                  overflowX: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
              >
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    }}
                    onClick={toggleModal} // Close modal when clicking on the cross
                    className="flex"
                >
                    <div style={{ transition: 'color 0.3s' }} className="hover:bg-gray-200 p-1 rounded-full flex">
                        <IoCloseSharp size={24} style={{ color: '#333' }} /> {/* Cross icon */}
                    </div>
                </div>
               <div className='p-6' style={{ width: '800px' }}> 
                <div className="font-semibold text-3xl mb-10">What this space offers</div>
                {
                    property.facilities.map((facilityGroup) => {
                        return(
                        <div>
                        {facilityGroup.facilities.filter(facility => facility !== 'false').length > 0 && (
                        <div>
                            <div className="mb-8 mt-10 font-semibold text-xl text-gray-800">
                            {renderFacilityTypeLabel(facilityGroup.type)}
                            </div>
                            {facilityGroup.facilities.map((facility) => {
                            if (facility !== 'false') {
                                return (
                                    <div>
                                <div className="flex mb-6 items-center">
                                    {renderIconByKey(facility)}
                                    {facility}
                                </div>
                                <div className="border-b border-gray-300 mb-6"></div>
                                </div>
                                );
                            }
                            return null;
                            })}
                        </div>
                        )}
                        </div>
                        )
                    })
                }
                </div>
              </div>
            </div>
          )}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">{property.name}</h1>
                    <div className="flex mt-3">
                        <CiLocationOn className="mr-2" style={{ marginTop: '3px' }}/> 
                        <u className="mr-2">{property.street}</u> 
                        <span className="mx-1">•</span> {/* Dot */}
                        <div className="ml-2 cursor-pointer font-bold" style={{ color: '#2563EB' }} onClick={openMapModal}>
                            Show on map
                        </div>
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* Larger image on the left */}
                    <div className="h-[400px] lg:col-span-1" style={{ position: 'relative' }}>
                        <img
                            src={property.imageUrls[0]}
                            alt={property.name}
                            className="rounded-l-lg w-full h-full object-cover-object-center"
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer',
                                filter: 'brightness(100%)' // Apply brightness effect
                            }}
                            onClick={() => handleImageClick(0)}
                            onMouseEnter={(e) => (e.target as HTMLImageElement).style.filter = 'brightness(70%)'}
                            onMouseLeave={(e) => (e.target as HTMLImageElement).style.filter = 'brightness(100%)'}
                        />
                    </div>
                    {/* Four smaller images on the right */}
                    <div className="grid grid-cols-2 gap-2">
                        {property.imageUrls.slice(1, 5).map((image, index) => (
                            <div
                                className="h-[195px]"
                                key={index}
                                style={{ position: 'relative' }}
                            >
                                <img
                                    src={image}
                                    alt={property.name}
                                    className={`w-full h-full object-cover-object-center ${index === 1 ? 'rounded-tr-lg' : ''} ${index === 3 ? 'rounded-br-lg' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        cursor: 'pointer',
                                        filter: index === 3 ? 'brightness(70%)' : 'brightness(100%)'
                                    }}
                                    onMouseEnter={(e) => (e.target as HTMLImageElement).style.filter = index === 3 ? 'brightness(100%)' : 'brightness(90%)'}
                                    onMouseLeave={(e) => (e.target as HTMLImageElement).style.filter = index === 3 ? 'brightness(70%)' : 'brightness(100%)'}
                                    onClick={() => handleImageClick(index + 1)}
                                />
                                {/* Display "More x photos" text on the image of index 3 */}
                                {index === 3 && (
                                    <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center text-white underline cursor-pointer font-bold">
                                        <span onClick={() => handleImageClick(4)}>
                                            More {property.imageUrls.length - 5} {property.imageUrls.length - 5 === 1 ? 'photo' : 'photos'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-10"> {/* Add margin-top */}
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                        <div className="pr-20 pt-10">
                            <h2 className="font-bold mb-2 text-2xl" >{property.type.spaceType} in: <span style={{ color: '#0C3570' }}>{property.city}</span>, <span style={{ color: '#0C3570' }}>{property.country}</span></h2>
                            <div className="mb-1">
                                {property.roomsCounter.find((room) => room.type === "Bedrooms")?.counter} {' '}
                                {property.roomsCounter.find((room) => room.type === "Bedrooms")?.counter === 1 ? 'bedroom' : 'bedrooms'}
                                <span className="ml-2 mr-1">•</span> {/* Dot */}
                                <span className="mr-1">3 beds</span>
                                <span className="mx-1">•</span> {/* Dot */}
                                {property.roomsCounter.find((room) => room.type === "Bathrooms")?.counter} {' '}
                                {property.roomsCounter.find((room) => room.type === "Bathrooms")?.counter === 1 ? 'bathroom' : 'bathrooms'}
                            </div>
                            <div className="flex mb-7 font-bold border-b border-gray-300">
                                <IoMdStar className="mr-1 mt-0.5 mb-8"/> 
                                {property.ranking}
                                 
                            </div>
                           <ProjectDescription name={property.name} description={property.description} length={600}/>
                           <div className="border-b border-gray-300 mt-12 mb-10"></div>
                           <div className="font-bold text-xl mb-7">What this space offers</div>
                           <div className="grid grid-cols-2 gap-3">
                                {propertyImportant.map((facility, index) => {
                                    return property.facilities.map((facilityGroup, innerIndex) => {
                                        if (facilityGroup.facilities.includes(facility) && count < 8) {
                                            count++;
                                            return (
                                                <div className="flex" key={`${index}_${innerIndex}`}>
                                                    {renderIconByKey(facility)}
                                                    {facility}
                                                </div>
                                            );
                                        }
                                        return null;
                                    });
                                })}
                            </div>
                            <button className="mt-7 rounded-md border border-black p-3 font-semibold text-gray-900 hover:bg-gray-100 transition" onClick={toggleModal}>Show all {totalFacilities} facilities</button>
                            <div className="border-b border-gray-300 mt-10"></div>
                             <div className="mt-8">
                             <div className="font-bold text-xl mb-3">Check-in and check-out dates</div>
                             <div className="font-semibold text-gray-700 mb-6">Add your trip details to get an accurate price</div>
                              <DatePicker
                            selected={checkIn}
                            onChange={onChangeUp}
                            minDate={minDate}
                                maxDate={maxDate}
                            startDate={checkIn}
                            endDate={checkOut}
                            selectsRange
                            inline
                            placeholderText="Check-In Date"
                            monthsShown={2}
                            id="custom-datepicker"
                            />
                            </div>
                             
                        </div>
                        <div className="border h-fit sticky top-10 mt-12 shadow-xl rounded-md">
                            <div className="top-0 z-50 bg-white rounded-md">
                        
                                <GuestInfoForm pricePerNight={property.pricePerNight} propertyId={property._id} checkInUpdatedDate={checkIn} checkOutUpdatedDate={checkOut} onCheckInChange={handleCheckInChange}
                onCheckOutChange={handleCheckOutChange}/>
                            </div>
                           
                        </div>
                       
                    </div>
                </div>
            </div>
    
            <div>
            <div className="font-bold text-xl mb-5 mt-10">
                Location
            </div>
            <div className="font-semibold mb-6">{property.street}</div>
             <iframe
                title="Property Location"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG0qUTBcs3wxiJwvEEe5hKa7QEYYkPd2Y&q=${property.latitude},${property.longitude}`}
                width="100%"
                height="550"
                style={{ border: 0 }}
                allowFullScreen={true} // Set allowFullScreen to true when the modal is open
                loading="lazy"
            ></iframe>
            </div>
            <div className="font-bold text-xl mb-5 mt-10">
            Things to know
            </div>
            <div className="grid grid-cols-3 gap-14">
            <div>
            <div className="font-bold mb-5">
                Home rules
            </div>
            <div>
           <div className="mb-3 flex">
           <div className="font-semibold">
                    Check-in
            </div>
                    : Between {property.checkIn.startTime} and {property.checkIn.endTime}
            </div>
           <div className="flex">
            <div className="font-semibold">
                    Check-out</div>: Until {property.checkOut}
            </div>
            <div className="mt-3 flex">
                <div className="font-semibold">
                    Number of guests
                </div>
                : Maximum of {property.noGuests} guests
            </div>
            <div className="flex mt-4 align-center">
                <button
                onClick={toggleFull}
                className='font-bold'
                style={{
                    textDecoration: 'underline',
                    color: 'black',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease', // Smooth transition effect
                }}
                >
                <span>{showFullDescription ? 'Show more' : 'Show more'}</span>
                </button>
                <MdKeyboardArrowRight className='ml-1 mt-0.5' style={{ fontSize: "22px" }}/>
            </div>
            </div>
            </div>
            <div>
                <div className="font-bold mb-5">
                    Property and security
                </div>
                 
                {combinedArray.slice(0, 5).map((security, index) => (
                    <div key={index} className="mb-4"> {/* Add margin-bottom for spacing */}
                        {renderRulesLabel(security.name, security.allowed)}
                    </div>
                ))}

                <div className="flex mt-4 align-center">
                <button
                onClick={togglePropertyInfo}
                className='font-bold'
                style={{
                    textDecoration: 'underline',
                    color: 'black',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease', // Smooth transition effect
                }}
                >
                <span>{showPropertyInfo ? 'Show more' : 'Show more'}</span>
                </button>
                <MdKeyboardArrowRight className='ml-1 mt-0.5' style={{ fontSize: "22px" }}/>
            </div>
            </div>
           </div>
            <div>
                {isFullScreen && (
                    <ImageFullScreen
                        imageUrls={property.imageUrls}
                        currentIndex={currentImageIndex}
                        property={property}
                        onThumbnailClick={handleThumbnailClick}
                        setIsFullScreen={setIsFullScreen}
                    />
                )}

                {showMap && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        {/* Adjust the modal size and content based on your requirements */}
                        <div className="bg-white p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Map</h2>
                            <iframe
                                title="Property Location"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBG0qUTBcs3wxiJwvEEe5hKa7QEYYkPd2Y&q=${property.latitude},${property.longitude}`}
                                width="800"
                                height="500"
                                style={{ border: 0 }}
                                allowFullScreen={true} // Set allowFullScreen to true when the modal is open
                                loading="lazy"
                            ></iframe>
                            <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-500 transition" onClick={closeMapModal}>Close</button>
                        </div>
                    </div>
                )}
                <SecurityModal
                isOpen={showPropertyInfo}
                onClose={togglePropertyInfo}
                title="Property and security"
                items={[
                    ...property.securityGuests.securityConditions
                        .filter(security => security.allowed === 'allowed')
                        .map(security => ({
                            icon: renderIconByKeySecurity(security.name, security.allowed),
                            name: security.name,
                            securityName: 'Security considerations'
                        })),
                    ...property.securityGuests.securityDevices
                        .filter(security => security.allowed === 'allowed')
                        .map(security => ({
                            icon: renderIconByKeySecurity(security.name, security.allowed),
                            name: security.name,
                            securityName: 'Security devices'
                        })),
                    ...property.securityGuests.propertyInfo
                        .filter(security => security.allowed === 'allowed')
                        .map(security => ({
                            icon: renderIconByKeySecurity(security.name, security.allowed),
                            name: security.name,
                            securityName: 'Property information'
                        }))
                ]}
            />
                {showFullDescription && (
                    <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent background
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={toggleFull} // Close modal when clicking outside
                    >
                    <div
                        style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '80%',
                        maxHeight: '80%',
                        overflow: 'auto',
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
                    >
                    <div className="flex justify-end cursor-pointer">
                    <div style={{ transition: 'color 0.3s' }} className="hover:bg-gray-200 p-1 rounded-full" onClick={toggleFull}>
                                <IoCloseSharp size={24} style={{ color: '#333' }} /> {/* Cross icon */}
                    </div>
                    </div>
                    <div className='p-6'> 
                        <h2 className='font-bold text-2xl pb-8 border-b border-gray-300'>Home rules</h2>
                        <h1 className='text-1xl mt-5'>You will be staying in someone's house, so treat it with care and respect.</h1>
                        <p className='mt-10 mb-6 text-1xl font-semibold'>
                            Check in and check out 
                        </p>
                        <div className="mt-4 flex items-center">
                            <CiClock2 size={34}/>
                            <div className="ml-4">
                                Check-in: Between {property.checkIn.startTime} and {property.checkIn.endTime}
                            </div>
                        </div>
                        <div className="mt-6 border-b border-gray-300">
                        </div>
                        <div className="mt-4 flex items-center">
                            <CiClock2 size={34}/>
                            <div className="ml-4">
                                Check-out: Until {property.checkOut}
                            </div>
                        </div>
                        <p className='mt-10 mb-7 text-1xl font-semibold'>
                            During your stay 
                        </p>
                        {property.houseRules.map((rule) => {
                            if(rule.name) {
                                return (
                                    <div>
                                    <div className="flex items-center gap-5 mb-4">
                                    {renderIconByKeyRule(rule.name, rule.allowed)}
                                    {renderRulesLabel(rule.name, rule.allowed)}
                                    </div>
                                    <div className="mb-4 border-b border-gray-300">
                                    </div>
                                    </div>
                                )
                            }
                        })}
                        {property.addedRule !== 'null' && property.addedRule !== '' && 
                        <div>
                            <div className="flex gap-8 ml-1 items-center">
                                <TfiNotepad style={{ fontSize: "30px"}}/>
                                <div>
                                    Added rules
                                    <div className="text-sm text-gray-800">
                                        {property.addedRule}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 mt-4">

                            </div>
                        </div>
                        }
                        <div className="flex gap-8 ml-1 items-center mt-4">
                        <BsFillPeopleFill style={{ fontSize: "30px"}}/>
                            Maximum of {property.noGuests} guests
                        </div>
                        
                    </div>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Detail;
