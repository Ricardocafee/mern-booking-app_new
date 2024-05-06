import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "./ManagePropertyForm";
import CheckInInformation from "../../components/OnlyCheckInInfo"

const WifiSection = () => {

    const { register} = useFormContext<PropertyFormData>();

    return (
        <div>
        <h2 className="text-2xl font-bold mb-8">Wi-Fi details</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
                <div className="mb-2">
                    Wi-Fi name
                </div>
        </label>
        <input
            type="text" 
            min={0}
            placeholder="Name of the Wi-Fi network"
            className="border rounded w-full py-2 px-2 font-normal"
            {...register("wifi.name")}
            >
        </input>
        <label className="text-gray-700 text-sm font-bold flex-1">
                <div className="mb-2 mt-6">
                    Wi-Fi password
                </div>
        </label>
        <input
            type="text" 
            min={0}
            placeholder="Password of the Wi-Fi network"
            className="border rounded w-full py-2 px-2 font-normal mb-4"
            {...register("wifi.password")}
            >
        </input>
        <CheckInInformation/>
        </div>
    );

};

export default WifiSection;