import React, { createContext, useState } from "react";

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
    const [image, setImage] = useState();
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [value, setValue] = useState(null);
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState(0);

  return (
    <ListingContext.Provider
      value={{
        image,
        setImage,
        itemName,
        setItemName,
        itemDescription,
        setItemDescription,
        brand,
        setBrand,
        value,
        setValue,
        condition,
        setCondition,
        price,
        setPrice,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
