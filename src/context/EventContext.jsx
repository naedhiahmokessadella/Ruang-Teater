import { createContext, useContext } from "react";
import useDummyData from "../hooks/useDummyData";

// Buat context
const EventContext = createContext();

// Provider
export function EventProvider({ children }) {
  const { events } = useDummyData();

  return (
    <EventContext.Provider value={{ events }}>
      {children}
    </EventContext.Provider>
  );
}

// Hook custom untuk akses context
export function useEvents() {
  return useContext(EventContext);
}
