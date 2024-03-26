import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {

    const { stripePromise } = useAppContext();
    const search = useSearchContext();
    const { propertyId } = useParams();

    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    useEffect(()=> {
        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);

            setNumberOfNights(Math.ceil(nights))
        }
    }, [search.checkIn, search.checkOut]);

    const { data: paymentIntentData } = useQuery("createPaymentIntent", () => 
        apiClient.createPaymentIntent(propertyId as string, numberOfNights.toString()), 
        {
            enabled: !!propertyId && numberOfNights > 0,
        }
    )

    const { data: property } = useQuery("fetchPropertyByID", ()=> 
    apiClient.fetchPropertyById(propertyId as string), 
    {
        enabled: !!propertyId,
    });

    const { data: currentUser } = useQuery(
        "fetchCurrentUser", 
        apiClient.fetchCurrentUser
    );

    if(!property){
        return <></>;
    }

    console.log(currentUser?.email);
    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingDetailsSummary 
            checkIn={search.checkIn} 
            checkOut={search.checkOut} 
            adultCount={search.adultCount} 
            childCount={search.childCount}
            numberOfNights={numberOfNights}
            property={property}
            />
            {currentUser && paymentIntentData && (
            <Elements stripe={stripePromise} options={{
                clientSecret: paymentIntentData.clientSecret,
            }}>
                <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
            </Elements>
            )};
        </div>
    );
};

export default Booking;