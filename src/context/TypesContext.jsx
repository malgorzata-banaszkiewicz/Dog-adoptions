import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { db } from "../api/firebase";
import { collection, getCountFromServer, onSnapshot } from "firebase/firestore";
import { BallTriangle } from "react-loader-spinner";
import { Box } from "@mui/material";

const TypesContext = createContext(null);

const setCollection = (coll) => {
  return collection(db, coll);
};

export const TypesProvider = ({ children }) => {
  const [sex, setSex] = useState(null);
  const [size, setSize] = useState(null);
  const [dogsType, setDogsType] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [hairLength, setHairLength] = useState(null);
  const [hairType, setHairType] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [numberOfUsers, setNumberOfUsers] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const state =
    !!sex &&
    !!size &&
    !!dogsType &&
    !!energy &&
    !!hairLength &&
    !!hairType &&
    !!organization;

  const getData = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const setData = (collection, setState) => {
    onSnapshot(collection, (querySnapshot) => {
      const data = getData(querySnapshot);
      setState(data);
    });
  };

  const getNumberOfUsers = async () => {
    const coll = collection(db, "AdditionalLoginDetails");
    const snapshot = await getCountFromServer(coll);
    setNumberOfUsers(snapshot.data().count);
  };

  useEffect(() => {
    setData(setCollection("DogsSex"), setSex);
    setData(setCollection("DogsSize"), setSize);
    setData(setCollection("DogsType"), setDogsType);
    setData(setCollection("EnergyLevel"), setEnergy);
    setData(setCollection("HairLength"), setHairLength);
    setData(setCollection("HairType"), setHairType);
    setData(setCollection("AdditionalLoginDetails"), setOrganization);
    setData(setCollection("Provinces"), setProvinces);
    getNumberOfUsers();
  }, []);

  if (!state)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#7a9bb1"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </Box>
    );

  const types = {
    sex: sex,
    size: size,
    dogsType: dogsType,
    energy: energy,
    hairLength: hairLength,
    hairType: hairType,
    organization: organization,
    numberOfUsers: numberOfUsers,
    provinces: provinces,
  };

  return (
    <TypesContext.Provider value={types}>{children}</TypesContext.Provider>
  );
};

export const useTypes = () => {
  const value = useContext(TypesContext);

  if (!value) throw new Error("You need TypesProvider!");

  return value;
};
