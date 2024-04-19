import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "./ManagePropertyForm";
import TypePropertyOptions from "../../components/TypePropertyOptions";
import { moreLikeSpace, TypeProperty, AdType } from "../../config/property-options-type";
import { useEffect, useState } from "react";

const TypeSection = () => {
    const { register, getValues, setValue, watch} = useFormContext<PropertyFormData>();
    const { type, state } = watch(); 
    const [renderComponent, setRenderComponent] = useState(false);


    useEffect(() => {
      const delay = 400; // Adjust the delay time as needed
      const timeout = setTimeout(() => {
          // Use the type values here after the delay
          // You can perform any actions here that require the type values
          setRenderComponent(true); // Set to render the component after timeout
  
          // Check if type.spaceType is still undefined after the timeout
          if (!type?.spaceType || type.spaceType === 'undefined') {
              // Set a default value for type.spaceType if it is still undefined
              setValue("type.spaceType", "Apartment");
          }
          if (!type?.propertyType || type.propertyType === 'undefined') {
              // Set a default value for type.spaceType if it is still undefined
              setValue("type.propertyType", "Lease Unit");
          }
          if (!type?.adType || type.adType == 'undefined') {
              // Set a default value for type.spaceType if it is still undefined
              setValue("type.adType", "Full Space");
          }
          if (!state || state == 'undefined') {
            // Set a default value for type.spaceType if it is still undefined
            setValue("state", "Available");
        }
      }, delay);
  
      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
  }, [type, setValue]); // Run this effect whenever the type values or setValue function change


    const handleSpaceType = (option: string) => {
      // Do something with the selected option, such as storing it in state
      console.log(option)
      setValue("type.spaceType", option)
      console.log(getValues());
    };
    const handlePropertyType = (option: string) => {
      // Do something with the selected option, such as storing it in state
      setValue("type.propertyType", option)
    };
    const handleAdType = (option: string) => {
      // Do something with the selected option, such as storing it in state
      setValue("type.adType", option)
    };

    return (
      <>
      {renderComponent && (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
           
            <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-2">
            <label className="text-gray-700 text-sm font-bold flex-1">
                        Which is more like your space?
            </label>
          </div>
          <TypePropertyOptions options={moreLikeSpace} initialOption={type?.spaceType || ''} onSelectOption={handleSpaceType} />
      </div>
      <div>
      <div className="mb-2">
          <label className="text-gray-700 text-sm font-bold flex-1">
                    What is the type of the property?
          </label>
      </div>
      <TypePropertyOptions options={TypeProperty} initialOption={type?.propertyType|| ''} onSelectOption={handlePropertyType}/>
      </div>  
      <div>
        <div className="mb-2">
          <label className="text-gray-700 text-sm font-bold flex-1">
                          What is the type of the ad?
          </label>
        </div>
      <TypePropertyOptions options={AdType} initialOption={type?.adType || ''} onSelectOption={handleAdType}/>
      </div>
      <div>
      <div className="mb-2">
          <label className="text-gray-700 text-sm font-bold flex-1">
                How many floors does the building have?
          </label>
        </div>
        <input
                    type="number" 
                    min={0}
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("type.counterFloors", { required: "This field is required", valueAsNumber: true })}
                    defaultValue={type?.counterFloors}>
        </input>
      </div>
      <div>
      <div className="mb-2">
          <label className="text-gray-700 text-sm font-bold flex-1">
          What floor is your space on?
          </label>
        </div>
        <input
                    type="number" 
                    className="border rounded w-full py-2 px-2 font-normal"
                    min={0}
                    {...register("type.numberFloor", { required: "This field is required", valueAsNumber: true })}
                    defaultValue={type?.numberFloor}>
        </input>
      </div>
      <div>
      <div className="mb-2">
          <div className="flex-col">
          <label className="text-gray-700 text-sm font-bold flex-1">
          Property size
          </label>
          &nbsp; {/* Non-breaking space */}
          <label className="text-gray-500 text-xs font-bold flex-1">
            (square metres)
          </label>
          </div>
        </div>
        <input
                    type="number" 
                    min={0}
                    className="border rounded w-full py-2 px-2 font-normal"
                    {...register("type.propertySize", { required: "This field is required", valueAsNumber: true })}
                    defaultValue={type?.propertySize}>
        </input>
      </div>
      </div>
        </div>
      )}
        </>);
};

export default TypeSection;