import "./reserved.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks.js/useFetch.js";
import React, { useContext, useState } from "react";
import { SearchContext } from "../../context/searchContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserved = ({ setOpenModal, hotelId }) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/v1/hotels/room/${hotelId}`
  );
  // /hotels/room/${hotelId}
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDateInMilliSeconds = new Date(start.getTime());

    const dates = [];

    while (end >= startDateInMilliSeconds) {
      dates.push(new Date(startDateInMilliSeconds).getTime());
      startDateInMilliSeconds.setDate(startDateInMilliSeconds.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  console.log(allDates);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(checked, value);

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);

  const handleClick = () => {
    selectedRooms.forEach(async (roomNumberId) => {
      const res = await axios.put(`/rooms/availability/${roomNumberId}`, {
        dates: allDates,
      });
      console.log(res.data);
    });
    setOpenModal(false);
    navigate("/");
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenModal(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkBox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserved;
