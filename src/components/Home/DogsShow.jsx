import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export const DogsShow = ({
  dogShow,
  types,
  isSmallScreen,
  isBiggestScreen,
  qform,
}) => {
  const navigate = useNavigate();
  const sendMe = (data) => {
    navigate(`/home/${data.id}`, { state: data.id });
  };

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {dogShow.map((m) => (
        <ListItem
          key={m.id}
          sx={{
            border: "0.3rem solid #F0DBDB",
            padding: isSmallScreen ? "1rem" : "2rem",
            borderRadius: "3rem",
            flexDirection: isSmallScreen ? "column" : "row",
            marginBottom: "5px",
          }}
        >
          <>
            {!m.reservationId ? (
              <Avatar
                sx={{
                  bgcolor: "#DBA39A",
                  color: "#fefcf3",
                  fontFamily: "Bagel Fat One, cursive",
                  width: isSmallScreen ? "6em" : "8em",
                  height: isSmallScreen ? "6em" : "8em",
                  fontSize: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "flex-start",
                  margin: "1rem",
                }}
              >
                Dostępny
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: "#e25944",
                  color: "#fefcf3",
                  fontFamily: "Bagel Fat One, cursive",
                  width: isSmallScreen ? "6em" : "8em",
                  height: isSmallScreen ? "6em" : "8em",
                  fontSize: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "flex-start",
                  margin: "1rem",
                }}
              >
                Rezerwacja
              </Avatar>
            )}

            <ListItemAvatar>
              <Avatar
                alt="Uroczy piesek do adopcji"
                src={m.image || `/src/assets/${"piesekbezzdjecia"}.png`}
                sx={{
                  width: isSmallScreen ? "12em" : "17em",
                  height: isSmallScreen ? "12em" : "17em",
                  width: isBiggestScreen ? "30em" : "17em",
                  height: isBiggestScreen ? "30em" : "17em",
                  margin: isSmallScreen ? "0" : "2rem",
                  border: "1rem dotted #F0DBDB",
                  display: "flex",
                  alignSelf: isSmallScreen ? "center" : "flex-end",
                }}
              />
            </ListItemAvatar>
          </>
          <div>
            {isBiggestScreen &&
              !!qform == false &&
              types.organization.find((f) => f.id == m.organization)
                ?.organization && (
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "#DBA39A",
                    color: "#fefcf3",
                    fontFamily: "Bagel Fat One, cursive",
                    minWidth: "fit-content",
                    width: "85%",
                    height: "100px",
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "flex-start",
                    margin: "1rem",
                    padding: "1rem",
                    border: "1rem dotted #F0DBDB",
                  }}
                >
                  Schronisko:
                  {
                    types.organization.find((f) => f.id == m.organization)
                      ?.organization
                  }
                </Avatar>
              )}
            <ListItemText
              datatype={m.name}
              primary={`Imię: ${m.name}`}
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: isSmallScreen ? 20 : 25,
                marginTop: "3rem",
                fontFamily: "Bagel Fat One, cursive",
              }}
              sx={{ cursor: "pointer" }}
              onClick={() => sendMe(m)}
              secondary={
                <React.Fragment>
                  <Typography
                    datatype={m.raceType}
                    sx={{
                      display: "flex",
                      textDecoration: "underline dotted #F0DBDB 0.3em",
                      textUnderlineOffset: "0.4em",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                    fontWeight="bold"
                  >
                    {types.dogsType.find((f) => f.id == m.raceType)?.namePL}
                  </Typography>
                  <br></br>
                  <Typography
                    datatype={m.age}
                    sx={{
                      display: "flex",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                  >
                    {` 🌳 Wiek:
									${m.age}`}
                  </Typography>
                  <br></br>
                  <Typography
                    datatype={m.energy}
                    sx={{
                      display: "flex",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                  >
                    {` 🔥 Energia:
								${types.energy.find((f) => f.id == m.energy)?.energyLevelPL}`}
                  </Typography>
                  <br></br>
                  <Typography
                    datatype={m.hairLength}
                    sx={{
                      display: "flex",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                  >
                    {` ✂️ Długość sierści:
														${types.hairLength.find((f) => f.id == m.hairLength)?.hairLengthPL}`}
                  </Typography>{" "}
                  <br></br>
                  <Typography
                    datatype={m.hairType}
                    sx={{
                      display: "flex",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                  >
                    {` 🦄 Typ sierści:
								${types.hairType.find((f) => f.id == m.hairType)?.hairTypePL}`}
                  </Typography>
                  <br></br>
                  <Typography
                    datatype={m.sex}
                    sx={{
                      display: "flex",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                  >
                    {` 🌈 Płeć: ${
                      types.sex.find((f) => f.id == m.sex)?.gender
                    }`}
                  </Typography>
                  <br></br>
                  <Typography
                    datatype={m.size}
                    sx={{
                      display: "flex",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                  >
                    {` 🐕 Wielkość:
								${types.size.find((f) => f.id == m.size)?.dogsSizePL}`}
                  </Typography>
                  <br></br>
                  <Typography
                    datatype={m.description}
                    sx={{
                      display: "flex",
                      fontFamily: "Bagel Fat One, cursive",
                      fontSize: `${isSmallScreen ? "16px" : "20px"}`,
                      alignSelf: "flex-start",
                    }}
                    component="span"
                    variant="body2"
                    color="#DBA39A"
                  >
                    {`  Opis psa:
								${
                  isBiggestScreen && !!qform == false
                    ? m.description ||
                      "Skontaktuj się ze schroniskiem w celu uzyskania dodatkowych informacji"
                    : m.description?.slice(0, 50) ||
                      "Skontaktuj się ze schroniskiem w celu uzyskania dodatkowych informacji"
                } (czytaj dalej)`}
                  </Typography>
                </React.Fragment>
              }
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
};
