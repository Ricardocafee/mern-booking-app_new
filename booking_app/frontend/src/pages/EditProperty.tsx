import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiClient from '../api-client';
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm";
import { useAppContext } from "../contexts/AppContext";

const EditProperty = () => {
    const { propertyId } = useParams();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { data: property } = useQuery("fetchMyPropertyById", ()=> 
    apiClient.fetchMyPropertyById(propertyId || ''), {
        enabled: !!propertyId,
    });

    const { mutate: updateProperty, isLoading: updateLoading } = useMutation(apiClient.updateMyPropertyById, {
        onSuccess: ()=>{
            showToast({ message: "Property Saved!", type: "SUCCESS"});

            setTimeout(() => {
                navigate('/my-properties');
            }, 500);
        },
        onError: ()=>{
            showToast({ message: "Error Saving Property", type: "ERROR"});
        }
    });

    const { mutate: deleteProperty, isLoading: deleteLoading } = useMutation(apiClient.deleteMyPropertyById, {
        onSuccess: () => {
            showToast({ message: "Property Deleted!", type: "SUCCESS" });
            // Wait for 500 milliseconds before navigating to "My Properties"
            setTimeout(() => {
                navigate('/my-properties');
            }, 500);
        },
        onError: () => {
            showToast({ message: "Error Deleting Property", type: "ERROR" });
        }
    });

    const handleSave = (propertyFormData: FormData, state: string) => {

        if (state === "Deactivated") {
            // Call delete mutation if propertyId is defined
            propertyId && deleteProperty(propertyId);
        } else {
            // Call update mutation
            console.log("Property form data", propertyFormData)
            updateProperty(propertyFormData);
        }
    }

    return <ManagePropertyForm property={property} onSave={handleSave} isLoading={updateLoading || deleteLoading}/>;
};

export default EditProperty;
