import SpaceEdit from "../../components/SpaceEdit"
import RoomCounter from "../../components/Room/RoomCounter";

const RoomsSection = () => {

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Rooms and Spaces</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Number of rooms
      </label>
      <RoomCounter/>
      <SpaceEdit/>
    </div>
  );
};

export default RoomsSection;
