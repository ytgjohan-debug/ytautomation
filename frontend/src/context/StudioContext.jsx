import { createContext, useState } from "react";

export const StudioContext = createContext();

export function StudioProvider({ children }) {
  const [sport, setSport] = useState("");
  const [players, setPlayers] = useState([]);
  const [script, setScript] = useState("");

  return (
    <StudioContext.Provider
      value={{
        sport,
        setSport,
        players,
        setPlayers,
        script,
        setScript,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}