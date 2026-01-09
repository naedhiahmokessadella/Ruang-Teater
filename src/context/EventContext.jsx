import { createContext, useContext } from "react";
import useEventsApi from "../hooks/useEventsApi";

const EventContext = createContext();

export function EventProvider({ children }) {
  const value = useEventsApi();
  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
