import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import CounterRoom from "../../components/Counter";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";

type Props = {
    propertyId: string;
    pricePerNight: number;
};

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    babyCount: number;
    petCount: number;
};

const GuestInfoForm = ({ propertyId, pricePerNight }: Props) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const { watch, handleSubmit, setValue } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
            babyCount: search.babyCount,
            petCount: search.petCount,
        }
    });

    const { data: property } = useQuery("fetchPropertyById", () =>
        apiClient.fetchPropertyById(propertyId as string), {
        enabled: !!propertyId,
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const adultCount = watch("adultCount");
    const childCount = watch("childCount");
    const babyCount = watch("babyCount");
    const petCount = watch("petCount");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount,
            data.babyCount,
            data.petCount,
        );
        navigate("/sign-in", { state: { from: location } });
    };

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount,
            data.babyCount,
            data.petCount,
        );
        navigate(`/property/${propertyId}/booking`);
    };

    const [isVisible, setIsVisible] = useState(false);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [petsAllowedName, setPetsAllowedName] = useState(false);
    const [borderVisible, setIsBorderVisible] = useState(false);

    const handleCounterChangeAdult = (value: number) => {
        setValue("adultCount", value);
    };

    const handleCounterChangeChild = (value: number) => {
        setValue("childCount", value);
    };

    const handleCounterChangeBaby = (value: number) => {
        setValue("babyCount", value);
    };

    const handleCounterChangePet = (value: number) => {
        setValue("petCount", value);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setIsBorderVisible(true);
    };

    const guestsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
                setIsBorderVisible(false);
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const blackBorderClass = borderVisible ? "border-black border-2" : "";
    let Petsname = "";

    useEffect(() => {
        let isAllowed = false;

        property?.houseRules.forEach((rule) => {
            if (rule.name === 'Pets allowed') {
                isAllowed = true;
                Petsname = rule.allowed === 'allowed' ? 'Pets are allowed' : 'Pets are not allowed';
                if (Petsname === 'Pets are allowed') {
                    setPetsAllowedName(true)
                } else {
                    setPetsAllowedName(false)
                }
            }
        });

        setPetsAllowed(isAllowed);
    }, [property]);

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="flex flex-col p-4 bg-white gap-4 rounded-full relative">
            <div className="flex">
                <h3 className="text-3xl font-bold ml-4 mt-4">€ {pricePerNight} </h3>
                <div className="text-gray-830 ml-2 mt-7"> per night</div>
            </div>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 items-center p-4">
                    <div className="grid grid-cols-2 mt-1">
                        <div
                            className="border border-gray-300 rounded-tl-xl cursor-pointer"
                            onClick={() => document.getElementById('checkInDatePicker')?.focus()}
                        >
                            <div className="px-4 pt-3 font-semibold">Check-in</div>
                            <DatePicker
                                selected={checkIn}
                                required
                                onChange={(date) => setValue("checkIn", date as Date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-In Date"
                                className="bg-white ml-3 mb-2 pl-1 focus:outline-none cursor-pointer w-[94px]"
                                wrapperClassName="w-23"
                                id="checkInDatePicker"
                            />
                        </div>
                        <div
                            className="border border-gray-300 rounded-tr-xl cursor-pointer"
                            onClick={() => document.getElementById('checkOutDatePicker')?.focus()}
                        >
                            <div className="px-4 pt-3 font-semibold">Check-out</div>
                            <DatePicker
                                selected={checkOut}
                                required
                                onChange={(date) => setValue("checkOut", date as Date)}
                                selectsEnd
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Check-Out Date"
                                className="bg-white ml-3 mb-2 pl-1 focus:outline-none cursor-pointer w-[94px]"
                                wrapperClassName="min-w-full"
                                id="checkOutDatePicker"
                            />
                        </div>
                    </div>

                    <div ref={guestsRef} className={`relative bg-white flex px-4 gap-2 border justify-between rounded-b-xl cursor-pointer ${blackBorderClass}`} onClick={toggleVisibility}>
                        <div>
                            <div className="pt-2 font-semibold">Guests</div>
                            <div className="mb-3">{childCount + adultCount} {childCount + adultCount === 1 ? "guest" : "guests"}</div>
                        </div>
                        <div className="ml-auto mt-6 p-1">
                            {isVisible ? <FaAngleUp /> : <FaAngleDown />}
                        </div>
                        {isVisible && (
                            <div className="absolute left-0 right-0 top-2 bg-white border border-gray-300 rounded-xl mt-16 p-4 z-50" onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <div className="font-semibold">
                                            Adults
                                        </div>
                                        <div className="text-gray-700 text-sm font-semibold">
                                            Age: over 13 years old
                                        </div>
                                    </div>
                                    <CounterRoom
                                        counter={adultCount || 0}
                                        setCounter={(value) => handleCounterChangeAdult(value)}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-2 mt-4">
                                    <div>
                                        <div className="font-semibold">
                                            Children
                                        </div>
                                        <div className="text-gray-700 text-sm font-semibold">
                                            Age between 2 and 12
                                        </div>
                                    </div>
                                    <CounterRoom
                                        counter={childCount || 0}
                                        setCounter={(value) => handleCounterChangeChild(value)}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-2 mt-4">
                                    <div>
                                        <div className="font-semibold">
                                            Babies
                                        </div>
                                        <div className="text-gray-700 text-sm font-semibold">
                                            Less than 2 years
                                        </div>
                                    </div>
                                    <CounterRoom
                                        counter={babyCount || 0}
                                        setCounter={(value) => handleCounterChangeBaby(value)}
                                    />
                                </div>
                                <div>
                                {petsAllowed && petsAllowedName && <div><div className="flex justify-between items-center mb-2 mt-4">
                                    <div>
                                        <div className="font-semibold">
                                            Pets
                                        </div>
                                    </div>
                                    <CounterRoom
                                        counter={petCount || 0}
                                        setCounter={(value) => handleCounterChangePet(value)}
                                    />
                                </div>
                                <div className="text-gray-700 text-xs mt-4">Babies do not count as guests. Pets are allowed.</div>
                                </div> 
                                
                                }
                                {petsAllowed && !petsAllowedName && <div className="text-gray-700 text-xs mt-4">Babies do not count as guests. Pets are not allowed.</div> 
                                
                                }
                                </div>
                                
                            </div>
                        )}
                    </div>

                    <div className="mb-6"></div>
                    {isLoggedIn ? (
                        <button className="bg-blue-600 text-white h-full p-2 font-semibold hover:bg-blue-500 text-xl rounded-md">Book Now</button>
                    ) : (
                        <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">Sign In to Book</button>
                    )}
                </div>
                <div className="justify-between flex mt-2 px-5 text-md">
                <div className="underline text-gray-900">€ {property?.pricePerNight} x {calculateNights()} nights</div>
                <div>
                   € {calculateNights() * (property?.pricePerNight ?? 0)}
                </div>
                </div>
                <div className="justify-between flex mt-4 px-5 text-md">
                <div className="underline text-gray-900">Cleaning fee</div>
                <div>
                   € 48
                </div>
                </div>
                <div className="border-b border-gray-300 mx-4 mt-6"></div>
                <div className="justify-between flex mx-5 mt-6 font-bold text-xl">
                <div>Total:</div>
                <div>€ {calculateNights() * (property?.pricePerNight ?? 0) + 48}</div>
                </div>
                
            </form>
        </div>
    );
};

export default GuestInfoForm;
