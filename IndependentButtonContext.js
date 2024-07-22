import React, { createContext, useState, useEffect } from "react";

export const IndependentButtonContext = createContext();

export const IndependentButtonProvider = ({ children }) => {
  const [buttonStates, setButtonStates] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false,
  });

  const toggleButton = (button) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  };

  return (
    <IndependentButtonContext.Provider
      value={{
        buttonStates,
        setButtonStates,
        toggleButton,
      }}
    >
      {children}
    </IndependentButtonContext.Provider>
  );
};
