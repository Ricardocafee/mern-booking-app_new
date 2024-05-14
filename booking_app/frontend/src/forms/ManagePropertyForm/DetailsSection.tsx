import { useFormContext } from "react-hook-form"
import { PropertyFormData } from "./ManagePropertyForm";

const DetailsSection = () => {
    const { register, 
        formState: { errors },
     } = useFormContext<PropertyFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-3">Main information</h2>
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
      <div className="grid grid-cols-2 gap-5">
      <label className="text-gray-700 text-sm font-bold">
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
      <label className="text-gray-700 text-sm font-bold">
        <div className="mb-2">
        Ranking
        </div>
        <input
          type="number"
          min={0}
          max={5}
          step="0.01"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("ranking", { required: "This field is required", valueAsNumber: true })}
        ></input>
        {errors.ranking && (
          <span className="text-red-500">{errors.ranking.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        <div className="mb-2">
        Number of guests
        </div>
        <input
          type="number"
          min={1}
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("noGuests", { required: "This field is required" })}
        ></input>
        {errors.noGuests && (
          <span className="text-red-500">{errors.noGuests.message}</span>
        )}
      </label>
      </div>
                
                </div>
    )
};

export default DetailsSection;