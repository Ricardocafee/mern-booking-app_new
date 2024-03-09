import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiClient from '../api-client';
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm";
import { useAppContext } from "../contexts/AppContext";

const EditProperty = () => {
    const { propertyId } = useParams();
    const { showToast } = useAppContext();

    const { data: property } = useQuery("fetchMyPropertyById", ()=> 
    apiClient.fetchMyPropertyById(propertyId || ''), {
        enabled: !!propertyId,
    }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyPropertyById, {
        onSuccess: ()=>{
            showToast({ message: "Property Saved!", type: "SUCCESS"});
        },
        onError: ()=>{
            showToast({ message: "Error Saving Property", type: "ERROR"});
        }
    });

    const handleSave = (propertyFormData: FormData) => {
        mutate(propertyFormData);
    }

    return <ManagePropertyForm property={property} onSave={handleSave} isLoading={isLoading}/>;
};

export default EditProperty;