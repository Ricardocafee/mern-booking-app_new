import React, { useState } from 'react';

interface Props {
    name: string;
    description: string;
}

const MAX_DESCRIPTION_LENGTH = 200;

const ProjectDescription: React.FC<Props> = ({ name, description }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div>
          <p>
            <strong>Description</strong>:{' '}
            {showFullDescription ? (
              `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            ) : (
              `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            )}
          </p>
          {description.length > MAX_DESCRIPTION_LENGTH && (
            <button
              onClick={toggleDescription}
              style={{
                textDecoration: 'underline',
                color: 'blue',
                cursor: 'pointer',
                transition: 'color 0.3s ease', // Smooth transition effect
              }}
              onMouseEnter={(e) =>
                (e.currentTarget as HTMLElement).style.color = 'black'
              } // Change color to black on hover
              onMouseLeave={(e) =>
                (e.currentTarget as HTMLElement).style.color = 'blue'
              } // Change color back to blue when not hovered
            >
              <span>{showFullDescription ? 'Show less' : 'Show more'}</span>
            </button>
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
