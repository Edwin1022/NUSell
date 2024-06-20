import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <ProductContext.Provider
      value={{ productId, setProductId, selectedItem, setSelectedItem }}
    >
      {children}
    </ProductContext.Provider>
  );
};
