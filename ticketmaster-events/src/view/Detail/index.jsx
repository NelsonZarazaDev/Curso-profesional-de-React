import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Detail() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=4OVVTdaCtrA0t2mj6vf2o6VG2G6SXW7W`
        );
        const data = await response.json();
        setEventData(data);
        setIsLoading(false);
      } catch (error) {
        setEventData({});
        setError(error);
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, []);

  if (isLoading && Object.keys(eventData) === 0) {
    return <div>Cargando ...</div>;
  }

  if (Object.error > 0) {
    <div>Ha ocurrido un error...</div>;
  }

  return (
    <div>
      <div>
        <img src={eventData.images?.[0].url} alt="" />
        <h4>{eventData.name}</h4>
        <p>{eventData.info}</p>
        {eventData.dates?.start.dateTime ? (
          <p>
            {format(
              new Date(eventData.dates.start.dateTime),
              "d LLLL yyyy H:mm",
              { locale: es }
            )}
            hrs
          </p>
        ) : null}
      </div>
    </div>
  );
}
