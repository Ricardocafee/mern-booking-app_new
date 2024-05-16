import { IoCloseSharp } from "react-icons/io5";

interface SecurityItem {
    icon: JSX.Element | null;
    name: string;
    securityName: string;
}

interface SecurityModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    items: SecurityItem[];
}

const groupItemsBySecurityName = (items: SecurityItem[]) => {
    const groupedItems: { [key: string]: SecurityItem[] } = {};
    items.forEach(item => {
        if (!groupedItems[item.securityName]) {
            groupedItems[item.securityName] = [];
        }
        groupedItems[item.securityName].push(item);
    });
    return groupedItems;
};

const SecurityModal = ({ isOpen, onClose, title, items }: SecurityModalProps) => {
    if (!isOpen) {
        return null;
    }

    const groupedItems = groupItemsBySecurityName(items);

    return (
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
            onClick={onClose} // Close modal when clicking outside
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
                    <div style={{ transition: 'color 0.3s' }} className="hover:bg-gray-200 p-1 rounded-full" onClick={onClose}>
                        <IoCloseSharp size={24} style={{ color: '#333' }} /> {/* Cross icon */}
                    </div>
                </div>
                <div className='p-6'> 
                    <h2 className='font-bold text-2xl pb-8 border-b border-gray-300'>{title}</h2>
                    <h1 className='text-1xl mt-5'>Avoid surprises by consulting these important details about your host's property.</h1>
                    {Object.entries(groupedItems).map(([securityName, items], index) => (
                        <div key={index}>
                            <p className='mt-10 mb-6 text-1xl font-semibold'>
                                {securityName}
                            </p>
                            {items.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-5 mb-4">
                                        {item.icon}
                                        {item.name}
                                    </div>
                                    <div className="mb-4 border-b border-gray-300"></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecurityModal;
