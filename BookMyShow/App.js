import "./styles.css";
import { useState } from "react";
import SeatGroup from "../src/components/SeatGroup";

export default function App() {
  const [seatData, setSeatData] = useState([
    {
      groupName: "Club:RS 250",
      seatRow: [
        {
          seat: [
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            }
          ],
          label: "A"
        },
        {
          seat: [
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            }
          ],
          label: "B"
        }
      ]
    },

    {
      groupName: "Elite:RS 500",
      seatRow: [
        {
          seat: [
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            }
          ],
          label: "A"
        },
        {
          seat: [
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            },
            {
              price: 250,
              Type: "notBooked",
              color: "green",
              onClick: () => alert(),
              id: "kj12nasd"
            }
          ],
          label: "B"
        }
      ]
    }
  ]);

  return (
    <div className="gridSeat">
      {seatData.map((group) => {
        return <SeatGroup {...group} />;
      })}
    </div>
  );
}
