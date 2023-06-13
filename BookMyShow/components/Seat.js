import "../styles.css";

export default function Seat({ price, Type, color, onClick, id }) {
  return <div className="seat" onClick={() => onClick}></div>;
}
