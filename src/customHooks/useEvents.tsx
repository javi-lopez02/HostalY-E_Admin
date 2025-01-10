import { useEffect, useState } from "react";
import { Events } from "../type";
import { getEventsRequest } from "../services/events";


function useEvents() {
  const [events, setEvents] = useState<Events[] | null>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getEventsRequest()
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { events, error, loading, setEvents };
}

export default useEvents;
