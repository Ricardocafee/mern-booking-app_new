import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import CounterRoom from "../components/Counter";


const SearchBar = () => {

    const navigate = useNavigate();
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);
    const [babyCount, setBabyCount] = useState<number>(search.babyCount);
    const [petCount, setPetCount] = useState<number>(search.petCount);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const guestsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
            destination, 
            checkIn, 
            checkOut, 
            adultCount, 
            childCount,
            babyCount,
            petCount,
            );
        navigate("/search");
    };


    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-2 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
            <div className="flex flex-row items-center flex-1 bg-white p-2 rounded hover:shadow-md hover:border-yellow-500 border border-transparent transition">
                <MdTravelExplore size={25} className="mr-2"/>
                <input placeholder="Where are you going?" 
                className="text-md w-full focus:outline-none text-gray-500"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                />
            </div>


            <div className="relative flex bg-white px-1 py-1 gap-1 rounded hover:shadow-md hover:border-yellow-500 border border-transparent transition" onClick={toggleVisibility}>
            
            <div ref={guestsRef} className="flex items-center min-w-full">
            <AiOutlineUser size={32} className="mr-2 text-gray-700 cursor-pointer" />
            <div className="text-gray-500 cursor-pointer">How many guests?</div>
            <div className="ml-auto p-1 cursor-pointer">
                {isVisible ? <FaAngleUp /> : <FaAngleDown />}
                
            </div>
            {isVisible && (
                            <div className="absolute w-[310px] left-0 right-0 top-3 mt-8 bg-white border border-gray-300 rounded-xl p-4 z-50" onClick={(e) => e.stopPropagation()}>
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
                                        setCounter={(value) => setAdultCount(value)}
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
                                        setCounter={(value) => setChildCount(value)}
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
                                        setCounter={(value) => setBabyCount(value)}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-2 mt-4">
                                    <div>
                                        <div className="font-semibold">
                                            Pets
                                        </div>
                                    </div>
                                    <CounterRoom
                                        counter={petCount || 0}
                                        setCounter={(value) => setPetCount(value)}
                                    />
                                </div>
                                 
                            </div>)
            }
            </div>
                
            </div>
            
            <div>
                <DatePicker selected={checkIn} 
                onChange={(date) => setCheckIn(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-In Date"
                className="min-w-full bg-white p-2 focus:outline-none rounded hover:shadow-md hover:border-yellow-500 border border-transparent transition"
                wrapperClassName="min-w-full"
                />
            </div>
            <div>
                <DatePicker selected={checkOut} 
                onChange={(date) => setCheckOut(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-In Date"
                className="min-w-full bg-white p-2 focus:outline-none rounded hover:shadow-md hover:border-yellow-500 border border-transparent transition"
                wrapperClassName="min-w-full"
                />
            </div>
            <div className="flex gap-1">
            <button className="w-full bg-blue-600 text-white h-full p-2 font-bold text-xl hover:shadow-md hover:bg-blue-500 rounded transition">
                Search
            </button>
            </div>
            
            
        </form>
    );
};

export default SearchBar;
