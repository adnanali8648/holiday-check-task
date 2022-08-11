import React, { useEffect, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import "./HotelView.css";

const HotelView = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [hotelView, setHotelView] = useState(true);
  const [isActive, setActive] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/hotels")
      .then((res) => res.json())
      .then((result) => {
        const formatHotelsData = Object.entries(result)
          .map(([key, value]) => {
            return value.map((item) => ({ ...item, destination: key }));
          })
          .flat();

        setHotels(formatHotelsData);
        setFilteredHotels(formatHotelsData);
      })
      .catch((err) => console.error(err));
  }, []);

  const getFilteredHotels = (star) => {
    setFilteredHotels(hotels.filter((item) => item.stars === star));
    setActive(star);
  };

  const filterButtons = [...Array(5)].map((item, index) => {
    index += 1;
    return (
      <Button
        className={isActive === index ? "active" : "inactive"}
        key={index}
        type="button"
        onClick={() => getFilteredHotels(index)}
        text={index}
      />
    );
  });

  return (
    <>
      <div className="viewChange">
        <h3>Filter Hotels By Rating</h3>
      </div>
      <div className="viewChange">{filterButtons}</div>
      <br></br>
      <div className="box">
        <div className="viewChange">
          <Button
            className={hotelView ? "active" : "inactive"}
            type="button"
            onClick={() => setHotelView(true)}
            text="Raw Data"
          />
          <Button
            className={!hotelView ? "active" : "inactive"}
            type="button"
            onClick={() => setHotelView(false)}
            text="Styled Data"
          />
        </div>
        <div className="card">
          {hotelView ? (
            <Card>
              <div className="rawData">
                {<pre>{JSON.stringify(filteredHotels, null, 2)}</pre>}
              </div>
            </Card>
          ) : (
            <>
              {filteredHotels.length > 0 &&
                filteredHotels.map((hotel) => (
                  <Card key={hotel.name}>
                    <div className="styledView">
                      <h3>{hotel.name}</h3>
                      <div>{hotel.destination}</div>

                      <div className="rating">
                        {[...Array(hotel.stars)].map((star, index) => {
                          index += 1;
                          return (
                            <span key={index} className="star">
                              &#9733;
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                ))}
              {filteredHotels.length === 0 && (
                <Card>
                  <div className="styledView">
                    <p className="error">Data not Found</p>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HotelView;
