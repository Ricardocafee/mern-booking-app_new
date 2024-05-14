import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "./ManagePropertyForm";
import Switch from "react-switch";

const ImmediateBookSection = () => {
    const { watch, setValue, getValues } = useFormContext<PropertyFormData>();

    // Provide a default value for immediateBook
    const immediateBook = watch("immediateBooking", false);

    // Ensure immediateBooking is initialized to false if it's null
    if (immediateBook === null) {
        setValue("immediateBooking", false);
    }

    const toggleBookAttachment: (checked: boolean) => void = (checked) => {
        setValue("immediateBooking", checked);
        const asdads = getValues()

        console.log("Valuesss", asdads)
    };

    return (
    <div>
        <h2 className="text-2xl font-bold mb-7">Immediate booking</h2>
        <div className="flex justify-between mt-5">
            <div>
                <div className="font-semibold mb-3">Use immediate booking</div>
                <div className="text-gray-800 text-md">Activate to automatically accept bookings. Disable to manually accept or decline booking requests.</div>
            </div>
            <Switch
                checked={immediateBook}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                onChange={(checked: boolean) => toggleBookAttachment(checked)}
            />
        </div>
    </div>
);
};

export default ImmediateBookSection;
