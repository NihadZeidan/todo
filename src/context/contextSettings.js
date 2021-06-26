import React, { useState } from "react";

export const userContext = React.createContext();

function SettingsProvider({ children }) {
  const [itemState, setItemState] = useState(false);
  const [itemPerScreen, setItemPerScreen] = useState(3);
  const [sortOn, setSortOn] = useState("difficulty");


  const allStates = {
    itemState,
    setItemState,
    itemPerScreen,
    setItemPerScreen,
    sortOn,
    setSortOn,
  };

  return (
    <userContext.Provider value={allStates}>{children}</userContext.Provider>
  );
}

export default SettingsProvider;
