import React, { createContext, useState } from "react";

export const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [activeButton, setActiveButton] = useState();

  return (
    <ButtonContext.Provider
      value={{
        activeButton,
        setActiveButton,
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};
