import { Button, TextField } from "@mui/material";
import { StyledForm } from "../Home/StyledForm";

export const Form = ({
  submitText,
  isPasswordHidden = false,
  onSubmit,
  isSmallScreen,
}) => (
  <StyledForm onSubmit={onSubmit}>
    <TextField
      sx={{
        width: `${isSmallScreen ? "350px" : "550px"}`,
        marginTop: "11px",
        zIndex: 0,
      }}
      label="Podaj email"
      size="small"
      color="success"
      name="email"
    />

    {!isPasswordHidden && (
      <TextField
        sx={{
          width: `${isSmallScreen ? "350px" : "550px"}`,
          marginTop: "11px",
          zIndex: 0,
        }}
        label="Podaj hasło"
        size="small"
        color="success"
        type="password"
        name="password"
      />
    )}
    <Button
      type="submit"
      variant="outlined"
      sx={{
        color: "#7a9bb1",
        borderColor: "#DAD0C2",
        fontWeight: "bold",
        fontSize: "16px",
        margin: "10px 0 0 10px",
        height: "50%",
      }}
    >
      {submitText}
    </Button>
    {/* <button>{submitText}</button> */}
  </StyledForm>
);
