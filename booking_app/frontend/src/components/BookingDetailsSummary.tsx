import { PropertyType } from "../../../backend/src/shared/types";

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    babyCount: number;
    petCount: number;
    numberOfNights: number;
    property: PropertyType;
};

const BookingDetailsSummary = ({
    checkIn, 
    checkOut, 
    adultCount, 
    childCount, 
    babyCount,
    petCount,
    numberOfNights, 
    property,
}: Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
        <h2 className="text-xl font-bold">Your Booking Details</h2>
        <div className="border-b py-2">
            Location: 
            <div className="font-bold">{` ${property.name}, ${property.city}, ${property.country}`}</div>
        </div>

        <div className="flex justify-between">
            <div>
                Check-In:
                <div className="font-bold">
                    {checkIn.toDateString()}
                </div>
            </div>
            <div>
                Check-Out:
                <div className="font-bold">
                    {checkOut.toDateString()}
                </div>
            </div>
            
        </div>
        <div className="border-t border-b py-2">
                Total length of stay:
                <div className="font-bold">
                    {numberOfNights} nights
                </div>
            </div>

        <div>
            Guests:
            <div className="font-bold">
                {adultCount} adults & {childCount} children & {babyCount} babies & {petCount} pets
            </div>
        </div>
    </div>
    );
};

export default BookingDetailsSummary;