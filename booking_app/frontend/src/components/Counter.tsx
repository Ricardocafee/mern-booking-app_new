// CounterRoom.tsx
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "../effects/ButtonCounter.css";

interface CounterRoomProps {
    counter: number; // Specify the type of the counter prop
    setCounter: (value: number) => void;
}


const Counter = ({ counter, setCounter}: CounterRoomProps) => {
    const handleClick1 = () => {
        setCounter(counter + 1);
    };

    const handleClick2 = () => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <button type="button" onClick={handleClick2} style={{ marginRight: "10px" }}>
                    <CiCircleMinus className={"circle-plus"} />
                </button>
                <div>{counter}</div>
                <button type="button" onClick={handleClick1} style={{ marginLeft: "10px" }}>
                    <CiCirclePlus className="circle-plus" />
                </button>
            </div>
        </div>
    );
};

export default Counter;
