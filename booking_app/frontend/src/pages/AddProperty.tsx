import { useMutation } from "react-query";
import ManagePropertyForm from "../forms/ManagePropertyForm/ManagePropertyForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client';
import { useNavigate } from "react-router-dom";


const AddProperty = () => {
    const {showToast} = useAppContext();
    const navigate = useNavigate(); 

    const {mutate, isLoading} = useMutation(apiClient.addMyProperty, {
        onSuccess: ()=>{
            showToast({message: "Property Saved!", type: "SUCCESS"});

            setTimeout(() => {
                navigate('/my-properties');
            }, 500);
        },
        onError: ()=>{
            showToast({message: "Error Saving Property!", type: "ERROR"});
        },
    });

    const handleSave = (PropertyFormData: FormData)=>{
        mutate(PropertyFormData)
    }

    return (<ManagePropertyForm onSave={handleSave} isLoading={isLoading}/>)
};

export default AddProperty;