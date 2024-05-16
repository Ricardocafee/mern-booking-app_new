import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { MdKeyboardArrowRight } from "react-icons/md"

interface Props {
    name: string;
    description: string;
    length: number;
}


const ProjectDescription: React.FC<Props> = ({ name, description, length }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    
    const MAX_DESCRIPTION_LENGTH = length;

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div>
          <p>
            {showFullDescription ? (
              `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            ) : (
              `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            )}
          </p>
          {description.length > MAX_DESCRIPTION_LENGTH && (
            <div className='flex mt-3'>
            <button
              onClick={toggleDescription}
              className='font-bold'
              style={{
                textDecoration: 'underline',
                color: 'black',
                cursor: 'pointer',
                transition: 'color 0.3s ease', // Smooth transition effect
              }}
            >
              <span>{showFullDescription ? 'Show more' : 'Show more'}</span>
            </button>
            <MdKeyboardArrowRight className='ml-1 mt-0.5' style={{ fontSize: "22px" }}/>
            </div>
          )}
      
          {/* Modal */}
          {showFullDescription && (
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
              }}
              onClick={toggleDescription} // Close modal when clicking outside
            >
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  maxWidth: '80%',
                  maxHeight: '80%',
                  overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
              >
              <div className="flex justify-end cursor-pointer">
              <div style={{ transition: 'color 0.3s' }} className="hover:bg-gray-200 p-1 rounded-full" onClick={toggleDescription}>
                        <IoCloseSharp size={24} style={{ color: '#333' }} /> {/* Cross icon */}
              </div>
              </div>
               <div className='p-6'> 
                <h2 className='font-bold text-2xl pb-4 border-b border-gray-300'>{name}</h2>
                <h1 className='font-bold text-1xl mt-5'>Description</h1>
                <p className='mt-6'>{description}</p>
              </div>
              </div>
            </div>
          )}
        </div>
      );
};

export default ProjectDescription;
