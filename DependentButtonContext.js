import React, { createContext, useState } from "react";

export const DependentButtonContext = createContext();

export const DependentButtonProvider = ({ children }) => {
  const [activeButton, setActiveButton] = useState();

  return (
    <DependentButtonContext.Provider
      value={{
        activeButton,
        setActiveButton,
      }}
    >
      {children}
    </DependentButtonContext.Provider>
  );
};
