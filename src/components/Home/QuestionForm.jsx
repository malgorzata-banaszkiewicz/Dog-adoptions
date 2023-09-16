import * as React from "react";
import Radio from "@mui/joy/Radio";
import FormControl from "@mui/joy/FormControl";
import RadioGroup from "@mui/joy/RadioGroup";
import FormHelperText from "@mui/joy/FormHelperText";
import { HideFormButton } from "./HideFormButton";
import { useEffect, useState } from "react";
import { useTypes } from "../../context/TypesContext";
import { LightTooltip } from "./ToolTipStyles";
import { StyledFormDiv } from "./QuestionFormStyles";

export const QuestionForm = ({ onClick, setCriteria, isSmallScreen }) => {
  const types = useTypes();
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);

  const handleOnChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQ1(e.target.value);
  };
  const handleOnChange2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQ2(e.target.value);
  };

  const handleOnChange3 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQ3(e.target.value);
  };

  let dogsEnergyArr = [];
  let dogsSizeArr = [];
  let dogsHairTypeArr = [];
  let dogsHairLengthArr = [];

  useEffect(() => {
    if (!!q1 || !!q2 || !!q3) {
      //dynamiczny obiekt pod wielofaktorowe query do bazy

      const allDogsEnergy = types.energy.map((energy) => energy.id);
      const allDogsSize = types.size.map((size) => size.id);
      const allDogsHairType = types.hairType.map((htype) => htype.id);
      const allDogsHairLength = types.hairLength.map((hlength) => hlength.id);

      if (!!q1) {
        //// przy tej odpowiedzi wyrzucamy pieski z wielkością na poziomie 'molos' (największe)
        if (q1 == "medium") {
          dogsSizeArr = allDogsSize.filter((f) => f != 4);
        }
        //// przy tej odpowiedzi wyrzucamy pieski z wielkością na poziomie 'molos' (największe) oraz z typem sierści:  'sierść', molos i tak bylby wyrzucony
        if (q1 == "big") {
          dogsHairTypeArr = allDogsHairType.filter((f) => f != 1);
        }
      }

      if (!!q2) {
        //// przy tej odpowiedzi wyrzucamy pieski z energią na poziomie: 'średni' i 'wysoki'
        if (q2 == "little") {
          dogsEnergyArr = allDogsEnergy.filter((f) => f == 1);
        }
        // przy tej odpowiedzi wyrzucamy pieski z energią na poziomie: 'niski'

        if (q2 == "medium") {
          dogsEnergyArr = allDogsEnergy.filter((f) => f != 1);
        }
        //// przy tej odpowiedzi wyrzucamy pieski z energią na poziomie: 'średni' i 'niski'

        if (q2 == "big") {
          dogsEnergyArr = allDogsEnergy.filter((f) => f == 3);
        }
      }
      if (!!q3) {
        //przy tej odpowiedzi wyrzucamy pieski z długością sierści: 'długie'
        if (q3 == "little") {
          dogsHairLengthArr = allDogsHairLength.filter((f) => f < 3);
        }
        // przy tej odpowiedzi wyrzucamy pieski z typem sierści: 'brak' i z długością sierści: 'bez włosów'
        if (q3 == "medium") {
          dogsHairLengthArr = allDogsHairLength.filter((f) => f > 2);
        }
        // przy tej odpowiedzi wyrzucamy pieski z typem sierści: 'brak' i 'sierść' oraz z długością sierści: 'bez włosów' i 'krótkie' czyli chcemy tylko takie, ktore mają długie wlosy
        if (q3 == "big") {
          (dogsHairTypeArr = allDogsHairType.filter((f) => f == 2)),
            (dogsHairLengthArr = allDogsHairLength.filter((f) => f == 3));
        }
      }
    }
    setCriteria({
      size: dogsSizeArr ?? [],
      energy: dogsEnergyArr ?? [],
      hairType: dogsHairTypeArr ?? [],
      hairLength: dogsHairLengthArr ?? [],
    });
  }, [q1, q2, q3]);

  return (
    <StyledFormDiv>
      <h3>POMOC</h3>
      <FormControl>
        <FormHelperText
          sx={{
            fontFamily: "Bagel Fat One, cursive",
            fontSize: `${isSmallScreen ? "14px" : "20px"}`,
          }}
        >
          Jak bardzo cenisz czystość w domu?
        </FormHelperText>
        <RadioGroup name="cleanliness" overlay onChange={handleOnChange}>
          <div
            style={{
              position: "relative",
            }}
          >
            <LightTooltip
              placement="right"
              title="Hej! Po wybraniu tej opcji zobaczysz wszystkie pieski."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Mało
                <Radio
                  value="little"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "little-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Po wybraniu tej opcji nie zobaczysz największych psów, które
							dekorują dom zarówno futrem, jak i śliną."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Średnio
                <Radio
                  value="medium"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "middle-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Po wybraniu tej opcji zobaczysz tylko psiaki, które mają
							włosy zamiast sierści."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Bardzo
                <Radio
                  value="big"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "big-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormHelperText
          sx={{
            fontFamily: "Bagel Fat One, cursive",
            fontSize: `${isSmallScreen ? "14px" : "20px"}`,
          }}
        >
          Jak bardzo jesteś aktywna/y?
        </FormHelperText>
        <RadioGroup name="outdoors" overlay onChange={handleOnChange2}>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Po wybraniu tej opcji zobaczysz psiaki, którym wystarczy rundka spacerkiem wokół bloku trzy razy dzienne."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Mało
                <Radio
                  value="little"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "little-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Wybierz tę opcję jeśli trzy półgodzinne spacery i godzina zabawy na świeżym powietrzu to
						Twój wymarzony plan dnia."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Średnio
                <Radio
                  value="medium"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "medium-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Wybierz tę opcję, jeśli chcesz trenować z pieskiem do zawodów."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Bardzo
                <Radio
                  value="big"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "big-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormHelperText
          sx={{
            fontFamily: "Bagel Fat One, cursive",
            fontSize: `${isSmallScreen ? "14px" : "20px"}`,
          }}
        >
          Ile czasu chcesz poświęcać na pielęgnację?
        </FormHelperText>

        <RadioGroup name="beauty" overlay onChange={handleOnChange3}>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Po wybraniu tej opcji zobaczysz tylko pieski, którym wystarczy czesanie raz w tygodniu, by utrzymać je w formie."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Mało
                <Radio
                  value="little"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "little-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Wybierz tę opcję, jeśli lubisz spędzać godziny na czesaniu pupila."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Dużo
                <Radio
                  value="medium"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "medium-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
          <div style={{ position: "relative" }}>
            <LightTooltip
              placement="right"
              title="Hej! Po wybraniu tej opcji zobaczysz psiaki z długim włosem zamiast
							futra. One wymagają najwięcej uwagi, ale nie linieją."
            >
              <FormHelperText
                sx={{
                  fontFamily: "Bagel Fat One, cursive",
                  fontSize: `${isSmallScreen ? "14px" : "20px"}`,
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                Więcej
                <Radio
                  value="big"
                  variant="outlined"
                  size={isSmallScreen ? "sm" : "lg"}
                  color="success"
                  slotProps={{
                    input: { "aria-describedby": "big-helper-text" },
                  }}
                />
              </FormHelperText>
            </LightTooltip>
          </div>
        </RadioGroup>
      </FormControl>
      <HideFormButton onClick={onClick}></HideFormButton>
    </StyledFormDiv>
  );
};
