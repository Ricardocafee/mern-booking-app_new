import { IoCloseSharp } from "react-icons/io5";
import { bedTypes } from "../../config/bedroom-options-config.ts";
import CounterRoom from "../Counter.tsx";
import { useFormContext } from "react-hook-form";
import { PropertyFormData } from "../../forms/ManagePropertyForm/ManagePropertyForm.tsx";

interface BedroomModalProps {
  onClose: () => void;
  ind: number | null;
}

const BedroomModal: React.FC<BedroomModalProps> = ({ onClose, ind }) => {
  
    const { watch, setValue } = useFormContext<PropertyFormData>();

    let roomDetail = watch("roomsDetails");

    const handleCounterChange = (value: number, type: string) => {

      if (ind !== null) {
        const existingIndex = roomDetail[ind].beds.findIndex(bed => bed.type === type);

         if (value === 0) {
            // If the value is 0, remove the field from 'beds'
            if (existingIndex !== -1) {
              roomDetail[ind].beds.splice(existingIndex, 1); // Remove the bed object
            }
          } else {
            if (existingIndex !== -1) {
              // If index with the same type exists, update its counter and type
              roomDetail[ind].beds[existingIndex].counter = value;
              roomDetail[ind].beds[existingIndex].type = type;
            } else {
              // If index with the same type doesn't exist, push a new object
              roomDetail[ind].beds.push({ counter: value, type: type });
            }
          }

        // Set updated room details back to form value
        setValue("roomsDetails", roomDetail);
      }

    };

  return (
  <div>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent background
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        style={{
          position: 'relative', // Make the container relative for positioning the cross icon
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '8px',
          maxWidth: '50%',
          maxHeight: '80%',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
            padding: '10px',
          }}
          onClick={onClose} // Close modal when clicking on the cross
        >
          <IoCloseSharp size={34} style={{ color: '#333' }} className="hover:bg-gray-200 p-1 rounded-full"/> {/* Cross icon */}
        </div>
        <div className='p-6' > 
          <div className="font-semibold text-3xl mb-2">Bedroom</div>
          <div className="text-gray text-md text-gray-800 mb-12">The number of beds in each advert is based on these choices.</div>
          <ul className="mt-4 border-b border-gray-300" style={{ overflowY: 'auto', maxHeight: '400px'  }}> {/* Set max height and overflow auto */}
            {bedTypes.map((type, index) => (
              <div className="flex justify-between items-center mb-10 pr-8" key={index}> {/* Moved key to div */}
                <li className="mb-2 text-lg">{type}</li>
                <CounterRoom
                  counter={(ind !== null && roomDetail[ind]?.beds.find(bed => bed.type === type)?.counter) || 0}
                  setCounter={(value) => handleCounterChange(value, type)}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

};

export default BedroomModal;
