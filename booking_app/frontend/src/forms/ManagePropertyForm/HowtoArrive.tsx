import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "./ManagePropertyForm";

const HowtoArriveSection = () => {

    const { register, formState: {errors}} = useFormContext<PropertyFormData>();

    return (
        <>
            <div>
            <h2 className="text-2xl font-bold mb-7">How to arrive</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    <textarea
                    rows={6}
                    className="border rounded w-full py-1 px-2 font-normal"
                    placeholder="Tell guests how to get to your space. Include tips on parking or public transportation."
                    {...register("howtoArrive")}
                    >
                    </textarea>
                    {errors.howtoArrive && (
                        <span className="text-red-500">
                            {errors.howtoArrive.message}
                        </span>
                    )}
            </label>
            </div>
        </>
    )
};

export default HowtoArriveSection;