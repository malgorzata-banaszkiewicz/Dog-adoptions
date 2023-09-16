import { auth, db } from "../../api/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseErrors } from "../../utils/firebaseErrors";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useTypes } from "../../context/TypesContext";
import { StyledForm } from "../Home/StyledForm";
import {
  Box,
  Button,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const Register = () => {
  const isSmallScreen = useMediaQuery("(max-width: 909px)");
  const [province, setProvince] = useState("");
  const [openProvince, setOpenProvince] = useState(false);
  const [isPrivateUser, setIsPrivateUser] = useState("true");

  const types = useTypes();
  const [user, setUser] = useState({
    email: "",
    password: "",
    nip: 0,
    org: "",
    location: 1,
    firstName: "",
    lastName: "",
    phone: "",
  });
  const provincesCollection = collection(db, "Provinces");
  const [provinces, setProvinces] = useState([]);

  //province select
  const handleProvince = (event) => {
    setProvince(event.target.value);
  };

  const handleCloseProvince = () => {
    setOpenProvince(false);
  };

  const handleOpenProvince = () => {
    setOpenProvince(true);
  };

  const getData = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  useEffect(() => {
    console.log(types);
    onSnapshot(provincesCollection, (querySnapshot) => {
      const data = getData(querySnapshot).sort((a, b) => a.id - b.id);
      setProvinces(data);
    });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      location: user.location,
      nip: user.nip,
      org: user.org,
      id: types.numberOfUsers + 1,
      verified: false,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };
    console.log(data);
    addDoc(collection(db, "AdditionalLoginDetails"), data).then((dataRef) => {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((jwt) => {
          e.target.reset();
          console.log(jwt);
          signOut(auth);
          alert("Możesz się już zalogować.");
        })
        .catch((e) => {
          console.dir(e);
          alert(firebaseErrors[e.code]);
        });
    });
  };

  const handleRadio = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPrivateUser(e.target.value);
  };
  return (
    <StyledForm onSubmit={handleRegister}>
      <TextField
        sx={{
          width: `${isSmallScreen ? "350px" : "550px"}`,
          marginTop: "11px",
          zIndex: 0,
        }}
        required
        label="Podaj email"
        size="small"
        color="success"
        name="email"
        id="email"
        onChange={(e) =>
          setUser((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <TextField
        sx={{
          width: `${isSmallScreen ? "350px" : "550px"}`,
          marginTop: "11px",
          zIndex: 0,
        }}
        required
        label="Podaj hasło"
        size="small"
        color="success"
        type="password"
        name="password"
        id="password"
        onChange={(e) =>
          setUser((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <RadioGroup
        defaultValue="true"
        onChange={handleRadio}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormHelperText>
          Osoba prywatna
          <Radio
            value="true"
            variant="outlined"
            color="success"
            slotProps={{
              input: { "aria-describedby": "little-helper-text" },
            }}
          ></Radio>
        </FormHelperText>
        <FormHelperText>
          Schronisko
          <Radio
            value="false"
            variant="outlined"
            color="success"
            slotProps={{
              input: { "aria-describedby": "little-helper-text" },
            }}
          ></Radio>
        </FormHelperText>
      </RadioGroup>

      {isPrivateUser == "true" ? (
        <>
          <TextField
            sx={{
              width: `${isSmallScreen ? "350px" : "550px"}`,
              marginTop: "11px",
              zIndex: 0,
            }}
            label="Podaj imię"
            size="small"
            color="success"
            name="name"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
          <TextField
            sx={{
              width: `${isSmallScreen ? "350px" : "550px"}`,
              marginTop: "11px",
              zIndex: 0,
            }}
            label="Podaj nazwisko"
            size="small"
            color="success"
            name="name"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <TextField
            sx={{
              width: `${isSmallScreen ? "350px" : "550px"}`,
              marginTop: "11px",
              zIndex: 0,
            }}
            label="Podaj numer telefonu"
            size="small"
            color="success"
            name="name"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </>
      ) : (
        <>
          <TextField
            sx={{
              width: `${isSmallScreen ? "350px" : "550px"}`,
              marginTop: "11px",
              zIndex: 0,
            }}
            label="Podaj NIP"
            size="small"
            color="success"
            name="nip"
            id="nip"
            type="number"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, nip: Number(e.target.value) }))
            }
          />
          <TextField
            sx={{
              width: `${isSmallScreen ? "350px" : "550px"}`,
              marginTop: "11px",
              zIndex: 0,
            }}
            label="Podaj nazwę schroniska"
            size="small"
            color="success"
            name="org"
            id="org"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, org: e.target.value }))
            }
          />
          <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
            <InputLabel id="province" color="success" variant="filled">
              Wybierz województwo
            </InputLabel>
            <Select
              labelId="province"
              id="province-select"
              open={openProvince}
              onClose={handleCloseProvince}
              onOpen={handleOpenProvince}
              value={province}
              label="Województwo"
              key="province"
              name="province"
              onChange={handleProvince}
              color="success"
              sx={{
                width: `${isSmallScreen ? "350px" : "550px"}`,
                color: "#DBA39A",
                paddingTop: "7px",
              }}
            >
              {provinces.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      <Button
        type="submit"
        variant="outlined"
        sx={{
          color: "#7a9bb1",
          borderColor: "#DAD0C2",
          fontWeight: "bold",
          fontSize: "16px",
          marginLeft: "10px",
          height: "50%",
          marginTop: "10px",
        }}
      >
        Zarejestruj się
      </Button>
    </StyledForm>
  );
};
