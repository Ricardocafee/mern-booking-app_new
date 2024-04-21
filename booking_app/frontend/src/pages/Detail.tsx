import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import ImageFullScreen from "../components/ImageFullScreen";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import ProjectDescription from "../components/PropertyDescription";
import { IoMdStar } from "react-icons/io";
import { renderIconByKey } from "../components/DictionaryIcons";
import { propertyImportant } from "../config/property-options-config";
import { IoCloseSharp } from "react-icons/io5";


const Detail = () => {
    const { propertyId } = useParams();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
                >
                    <div style={{ transition: 'color 0.3s' }} className="hover:bg-gray-200 p-1 rounded-full">
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
                                <div className="flex mb-6">
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
                           
                        </div>
                        <div className="border h-fit sticky top-10 mt-12 shadow-xl rounded-md">
                            <div className="top-0 z-50 bg-white rounded-md">
                                <GuestInfoForm pricePerNight={property.pricePerNight} propertyId={property._id} />
                            </div>
                        </div>
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
                                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${property.latitude},${property.longitude}`}
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
            </div>
        </div>
    );
};

export default Detail;
