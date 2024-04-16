import { useFormContext } from "react-hook-form"
import { PropertyFormData } from "./ManagePropertyForm";

const DetailsSection = () => {
    const { register, 
        formState: { errors },
     } = useFormContext<PropertyFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Property</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                <div className="mb-2">
                    Title
                </div>
                    <input
                    type="text" 
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("name", { required: "This field is required" })}
                    ></input>
                    {errors.name && (
                        <span className="text-red-500">
                            {errors.name.message}
                        </span>
                    )}
                </label>
                <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                <div className="mb-2">
                    City
                </div>
                    <input
                    type="text" 
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("city", { required: "This field is required" })}
                    ></input>
                    {errors.city && (
                        <span className="text-red-500">
                            {errors.city.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <div className="mb-2">
                        Country
                    </div>
                    <input
                    type="text" 
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("country", { required: "This field is required" })}
                    ></input>
                    {errors.country && (
                        <span className="text-red-500">
                            {errors.country.message}
                        </span>
                    )}
                </label>
                
                </div>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <div className="mb-2">
                        Street
                    </div>
                    <input
                    type="text" 
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("street", { required: "This field is required" })}
                    ></input>
                    {errors.street && (
                        <span className="text-red-500">
                            {errors.street.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <div className="mb-2">
                        Description of the neighbourhood
                    </div>
                    <input
                    type="text" 
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("neighbourhoodDescription", { required: "This field is required" })}
                    ></input>
                    {errors.neighbourhoodDescription && (
                        <span className="text-red-500">
                            {errors.neighbourhoodDescription.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <div className="mb-2">
                        Means of transport
                    </div>
                    <input
                    type="text" 
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("transport", { required: "This field is required" })}
                    ></input>
                    {errors.transport && (
                        <span className="text-red-500">
                            {errors.transport.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                <div className="mb-2">
                    Description
                </div>
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold w-[50%]">
        <div className="mb-2">
        Price Per Night
        </div>
        <input
          type="number"
          min={1}
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold w-[50%]">
        <div className="mb-2">
            Star Rating
        </div>
        <select
            {...register("starRating", {
                required: "This fields is required",
            })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
        >
            <option value="" className="text-sm font-bold">
                Select a Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}> {num} </option>
            ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
                
                </div>
    )
};

export default DetailsSection;