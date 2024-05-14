import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "./ManagePropertyForm";
import CheckInInformation from "../../components/OnlyCheckInInfo"

const HouseManualSection = () => {

    const { register, watch, setValue, formState: {errors}} = useFormContext<PropertyFormData>();

    if (watch("houseManual") === "null"){
        setValue("houseManual", "")
    }


    return (
        <>
            <div>
            <h2 className="text-2xl font-bold mb-7">House manual</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    <textarea
                    rows={6}
                    className="border rounded w-full py-1 px-2 font-normal mb-2"
                    placeholder="Give your guests some tips on how to use your space, for example, how to access the internet or use the TV."
                    {...register("houseManual")}
                    >
                    </textarea>
                    {errors.houseManual && (
                        <span className="text-red-500">
                            {errors.houseManual.message}
                        </span>
                    )}

            </label>
            <CheckInInformation/>
            </div>
        </>
    );

};

export default HouseManualSection;