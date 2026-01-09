import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://695e0f242556fd22f6772c21.mockapi.io/events";

export default function useEventsApi() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const res = await axios.get(API_URL);
    setEvents(res.data);
    setLoading(false);
  };

  const addEvent = async (data) => {
    const res = await axios.post(API_URL, {
      ...data,
      capacity: Number(data.capacity),
      attendees: Number(data.attendees),
      status:
        Number(data.attendees) >= Number(data.capacity)
          ? "Full"
          : "Available",
    });

    setEvents((prev) => [...prev, res.data]);
  };

  const updateEvent = async (id, data) => {
    await axios.put(`${API_URL}/${id}`, {
      ...data,
      status:
        Number(data.attendees) >= Number(data.capacity)
          ? "Full"
          : "Available",
    });
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}
