import { QuestionButton } from "./QuestionButton";
import { QuestionForm } from "./QuestionForm";
import { useEffect, useState } from "react";
import {
  and,
  collection,
  onSnapshot,
  or,
  query,
  where,
} from "firebase/firestore";
import { useTypes } from "../../context/TypesContext";
import { db } from "../../api/firebase";
import { Search } from "./Search";
import { getDogs } from "../Api";
import { HomeBox } from "./HomeBox";
import { DogsShow } from "./DogsShow";
import { QuestionFormAndDogsShow } from "./QuestionFormAndDogsShow";
import { Box, Button, Container, useMediaQuery } from "@mui/material";

export const Home = ({ email }) => {
  //for using types
  const types = useTypes();
  //for changing states
  const [qform, setQform] = useState(false);
  const [criteria, setCriteria] = useState(null);
  const dogsCollection = collection(db, "Dogs");
  const [dogShow, setDogShow] = useState([]);
  const [search, setSearch] = useState(false);
  // for media queries
  const isSmallScreen = useMediaQuery("(max-width: 909px)");
  const isSmallestScreen = useMediaQuery("(max-width: 480px)");
  const isBiggestScreen = useMediaQuery("(min-width: 1300px)");

  const getData = (q) => {
    onSnapshot(q, (querySnapshot) => {
      const dogs = getDogs(querySnapshot);
      console.log(dogs);
      console.log(criteria);
      setDogShow(dogs);
    });
  };

  useEffect(() => {
    if (!!criteria) {
      if (qform) {
        console.log("criteria", criteria);
        const q = query(
          dogsCollection,
          and(
            or(
              ...(criteria.energy ?? []).map((m) =>
                where("energy", "==", m ?? 1)
              )
            ),
            or(
              ...(criteria.size ?? []).map((m) => where("size", "==", m ?? 1))
            ),
            or(
              ...(criteria.hairType ?? []).map((m) =>
                where("hairType", "==", m ?? 1)
              )
            ),
            or(
              ...(criteria.hairLength ?? []).map((m) =>
                where("hairLength", "==", m ?? 1)
              )
            )
          )
        );
        getData(q);
      } else {
        const queryArr = [];

        if (Number(criteria.age) != 0) {
          const ageArr = [];
          for (let i = 0; i < Number(criteria.age); i++) {
            ageArr.push(where("age", "==", i));
          }
          queryArr.push(or(...ageArr));
        }

        !!criteria.name?.length &&
          queryArr.push(where("name", "==", criteria.name));
        Number(criteria.raceType) != 0 &&
          queryArr.push(where("raceType", "==", Number(criteria.raceType)));
        Number(criteria.size) != 0 &&
          queryArr.push(where("size", "==", Number(criteria.size)));
        Number(criteria.energy) != 0 &&
          queryArr.push(where("energy", "==", Number(criteria.energy)));
        Number(criteria.hairLength) != 0 &&
          queryArr.push(where("hairLength", "==", Number(criteria.hairLength)));
        Number(criteria.hairType) != 0 &&
          queryArr.push(where("hairType", "==", Number(criteria.hairType)));
        Number(criteria.sex) != 0 &&
          queryArr.push(where("sex", "==", Number(criteria.sex)));
        Number(criteria.organization) != 0 &&
          queryArr.push(
            where("organization", "==", Number(criteria.organization))
          );

        const q = query(dogsCollection, and(...queryArr));
        getData(q);
      }
    } else {
      getData(dogsCollection);
    }
  }, [criteria]);

  return (
    <HomeBox>
      <h1
        style={{
          fontSize: isSmallScreen ? "2.2em" : "3.2em",
          textAlign: "center",
        }}
      >
        {" "}
        DBF - psy z różnych schronisk w jednym miejscu
      </h1>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <span>Skorzystaj z formularza, by filtrować wyniki:</span>
          {!search ? (
            <Button
              variant="outlined"
              sx={{
                color: "#7a9bb1",
                borderColor: "#DAD0C2",
                fontWeight: "bold",
                fontSize: "16px",
                marginRight: "8px",
                height: "50%",
                marginBottom: "30px",
                width: "80px",
              }}
              onClick={() => {
                setSearch(!search);
                setQform(false);
                setCriteria(null);
              }}
            >
              Szukaj
            </Button>
          ) : (
            <Search
              setSearch={setSearch}
              types={types}
              setCriteria={setCriteria}
              enableCitySerch={true}
              isSmallScreen={isSmallScreen}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <span>lub odpowiedz na pytania pomocnicze:</span>
          {!qform && (
            <QuestionButton
              onClick={() => {
                setQform(true);
                setSearch(false);
                setCriteria(null);
              }}
            ></QuestionButton>
          )}
        </Box>
      </Container>
      <h2>Lista psów do adopcji:</h2>
      <QuestionFormAndDogsShow
        qform={qform}
        isSmallestScreen={isSmallestScreen}
      >
        {qform && (
          <QuestionForm
            onClick={() => {
              setQform(false);
              setCriteria(null);
            }}
            setCriteria={setCriteria}
            isSmallScreen={isSmallScreen}
          ></QuestionForm>
        )}
        <DogsShow
          qform={qform}
          dogShow={dogShow}
          types={types}
          isSmallScreen={isSmallScreen}
          isBiggestScreen={isBiggestScreen}
        ></DogsShow>
      </QuestionFormAndDogsShow>
    </HomeBox>
  );
};
