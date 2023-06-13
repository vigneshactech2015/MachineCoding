import "../styles.css";
import Seat from "./Seat";
export default function SeatRow({ seat = [], label }) {
  return (
    <div className="seatRow">
      <div>{label}</div>
      <div className="seatRow_2ndRow">
        {seat?.map((e) => {
          return <Seat {...e} />;
        })}
      </div>
    </div>
  );
}
