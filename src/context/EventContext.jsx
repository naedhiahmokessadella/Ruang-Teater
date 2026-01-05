import { createContext, useContext } from "react";
import useDummyData from "../hooks/useDummyData";
import { useNavigate } from "react-router-dom";

// Buat context
const EventContext = createContext();

// Provider
export function EventProvider({ children }) {
  const { events } = useDummyData();
  const navigate = useNavigate(); // ✅ Hook React Router

  // Tambahkan fungsi navigasi untuk detail event
  const goToEventDetail = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <EventContext.Provider value={{ events, goToEventDetail }}>
      {children}
    </EventContext.Provider>
  );
}

// Hook custom untuk akses context
export function useEvents() {
  return useContext(EventContext);
}
