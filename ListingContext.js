import React, { createContext, useState } from "react";

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [image, setImage] = useState();
  const [identifyResult, setIdentifyResult] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [value, setValue] = useState(null);
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState(0);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <ListingContext.Provider
      value={{
        image,
        setImage,
        identifyResult,
        setIdentifyResult,
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
        latitude,
        setLatitude,
        longitude,
        setLongitude,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
