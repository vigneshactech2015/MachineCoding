import "../styles.css";
import SeatRow from "./SeatRow";

export default function SeatGroup({ groupName, seatRow = [] }) {
  return (
    <div className="seatGroup">
      <label className="seatGroup_label">{groupName}</label>
      <div className="seatGroup_column">
        {seatRow?.map((seatR) => {
          return <SeatRow {...seatR} />;
        })}
      </div>
    </div>
  );
}
