import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { StyledForm } from "./StyledForm";

export const Search = ({
  setCriteria,
  setSearch,
  types,
  enableCitySerch,
  isSmallScreen,
}) => {
  const [visibility, setVisibility] = useState(false);

  const [breed, setBreed] = React.useState("");
  const [openBreed, setOpenBreed] = React.useState(false);
  const [size, setSize] = React.useState("");
  const [openSize, setOpenSize] = React.useState(false);
  const [hairType, setHairType] = React.useState("");
  const [openHairType, setOpenHairType] = React.useState(false);
  const [hairLength, setHairLength] = React.useState("");
  const [openHairLength, setOpenHairLength] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [openGender, setOpenGender] = React.useState(false);
  const [energy, setEnergy] = React.useState("");
  const [openEnergy, setOpenEnergy] = React.useState(false);
  const [organization, setOrganization] = React.useState("");
  const [openOrganization, setOpenOrganization] = React.useState(false);
  const [name, setName] = React.useState();
  const [age, setAge] = React.useState();

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (enableCitySerch) {
      setCriteria({
        name: name,
        age: age,
        size: size,
        energy: energy,
        hairLength: hairLength,
        hairType: hairType,
        organization: organization,
        raceType: breed,
        sex: gender,
      });
    } else {
      setCriteria({
        name: name,
        age: age,
        size: size,
        energy: energy,
        hairLength: hairLength,
        hairType: hairType,
        raceType: breed,
        sex: gender,
      });
    }
  };

  if (visibility)
    return <button onClick={() => setVisibility(!visibility)}>Search</button>;

  //breed select
  const handleOpenBreed = () => {
    setOpenBreed(true);
  };
  const handleSelectBreed = (event) => {
    setBreed(event.target.value);
  };
  const handleCloseBreed = () => {
    setOpenBreed(false);
  };

  //size select
  const handleSelectSize = (event) => {
    setSize(event.target.value);
  };

  const handleCloseSize = () => {
    setOpenSize(false);
  };

  const handleOpenSize = () => {
    setOpenSize(true);
  };

  //hairtype select

  const handleSelectHairType = (event) => {
    setHairType(event.target.value);
  };

  const handleCloseHairType = () => {
    setOpenHairType(false);
  };

  const handleOpenHairType = () => {
    setOpenHairType(true);
  };

  //hairlength select
  const handleSelectHairLength = (event) => {
    setHairLength(event.target.value);
  };

  const handleCloseHairLength = () => {
    setOpenHairLength(false);
  };

  const handleOpenHairLength = () => {
    setOpenHairLength(true);
  };

  //gender select
  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleCloseGender = () => {
    setOpenGender(false);
  };

  const handleOpenGender = () => {
    setOpenGender(true);
  };
  //energy select
  const handleEnergy = (event) => {
    setEnergy(event.target.value);
  };

  const handleCloseEnergy = () => {
    setOpenEnergy(false);
  };

  const handleOpenEnergy = () => {
    setOpenEnergy(true);
  };

  //energy Organization
  const handleOrganization = (event) => {
    setOrganization(event.target.value);
  };

  const handleCloseOrganization = () => {
    setOpenOrganization(false);
  };

  const handleOpenOrganization = () => {
    setOpenOrganization(true);
  };

  //name
  const handleName = (event) => {
    setName(event.target.value);
  };

  //age
  const handleAge = (event) => {
    setAge(event.target.value);
  };

  return (
    <StyledForm onSubmit={HandleSubmit}>
      Jakiego psa szukasz?
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
        <InputLabel id="Breed" color="success">
          Rasa
        </InputLabel>
        <Select
          labelId="Breed"
          id="breed-select"
          open={openBreed}
          onClose={handleCloseBreed}
          onOpen={handleOpenBreed}
          value={breed}
          name="raceType"
          label="Rasa"
          key="dogBreed"
          onChange={handleSelectBreed}
          color="success"
          sx={{
            color: "#DBA39A",
            width: `${isSmallScreen ? "350px" : "550px"}`,
          }}
        >
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {types.dogsType.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.namePL}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
        <InputLabel id="Size" color="success">
          Wielkość
        </InputLabel>
        <Select
          labelId="Size"
          id="size-select"
          open={openSize}
          onClose={handleCloseSize}
          onOpen={handleOpenSize}
          value={size}
          label="Wielkość"
          key="dogSize"
          name="size"
          onChange={handleSelectSize}
          color="success"
          sx={{
            width: `${isSmallScreen ? "350px" : "550px"}`,
            color: "#DBA39A",
          }}
        >
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {types.size.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.dogsSizePL}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
        <InputLabel id="HairType" color="success">
          Rodzaj sierści
        </InputLabel>
        <Select
          labelId="HairType"
          id="HairType-select"
          open={openHairType}
          onClose={handleCloseHairType}
          onOpen={handleOpenHairType}
          value={hairType}
          label="Rodzaj sierści"
          key="HairType"
          onChange={handleSelectHairType}
          color="success"
          sx={{
            width: `${isSmallScreen ? "350px" : "550px"}`,
            color: "#DBA39A",
          }}
        >
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {types.hairType.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.hairTypePL}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
        <InputLabel id="hairLength" color="success">
          Długość sierści
        </InputLabel>
        <Select
          labelId="hairLength"
          id="HairLength-select"
          open={openHairLength}
          onClose={handleCloseHairLength}
          onOpen={handleOpenHairLength}
          value={hairLength}
          label="Długość sierści"
          key="hairLength"
          name="hairLength"
          onChange={handleSelectHairLength}
          color="success"
          sx={{
            width: `${isSmallScreen ? "350px" : "550px"}`,
            color: "#DBA39A",
          }}
        >
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {types.hairLength.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.hairLengthPL}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
        <InputLabel id="gender" color="success">
          Płeć
        </InputLabel>
        <Select
          labelId="gender"
          id="gender-select"
          open={openGender}
          onClose={handleCloseGender}
          onOpen={handleOpenGender}
          value={gender}
          label="Płeć"
          key="Gender"
          name="Gender"
          onChange={handleGender}
          color="success"
          sx={{
            width: `${isSmallScreen ? "350px" : "550px"}`,
            color: "#DBA39A",
          }}
        >
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {types.sex.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
        <InputLabel id="energy" color="success">
          Energia
        </InputLabel>
        <Select
          labelId="energy"
          id="energy-select"
          open={openEnergy}
          onClose={handleCloseEnergy}
          onOpen={handleOpenEnergy}
          value={energy}
          label="Energia"
          key="energy"
          name="energy"
          onChange={handleEnergy}
          color="success"
          sx={{
            width: `${isSmallScreen ? "350px" : "550px"}`,
            color: "#DBA39A",
          }}
        >
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {types.energy.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.energyLevelPL}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {enableCitySerch && (
        <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
          <InputLabel id="organization" color="success">
            Schronisko
          </InputLabel>
          <Select
            labelId="organization"
            id="organization-select"
            open={openOrganization}
            onClose={handleCloseOrganization}
            onOpen={handleOpenOrganization}
            value={organization}
            label="Schronisko"
            key="organization"
            name="organization"
            onChange={handleOrganization}
            color="success"
            sx={{
              width: `${isSmallScreen ? "350px" : "550px"}`,
              color: "#DBA39A",
            }}
          >
            <MenuItem value="">
              <em>Brak</em>
            </MenuItem>
            {types.organization.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.organization}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <TextField
        sx={{
          width: `${isSmallScreen ? "350px" : "550px"}`,
          marginTop: "11px",
          zIndex: 0,
        }}
        label="Imię"
        size="small"
        color="success"
        name="name"
        onChange={handleName}
      />
      <TextField
        sx={{
          width: `${isSmallScreen ? "350px" : "550px"}`,
          marginTop: "15px",
          marginBottom: "10px",
          zIndex: 0,
        }}
        label="Wiek do"
        name="age"
        size="small"
        color="success"
        onChange={handleAge}
      />
      <Button
        variant="outlined"
        sx={{
          color: "#7a9bb1",
          borderColor: "#DAD0C2",
          fontWeight: "bold",
          fontSize: "16px",
          marginRight: "8px",
          height: "50%",
          marginTop: "5px",
          marginBottom: "15px",
        }}
        type="submit"
      >
        Szukaj
      </Button>
      <Button
        variant="outlined"
        sx={{
          color: "#7a9bb1",
          borderColor: "#DAD0C2",
          fontWeight: "bold",
          fontSize: "16px",
          marginRight: "8px",
          height: "50%",
          marginTop: "0px",
        }}
        onClick={() => {
          setSearch(false);
          setCriteria(null);
        }}
      >
        Anuluj
      </Button>
    </StyledForm>
  );
};
