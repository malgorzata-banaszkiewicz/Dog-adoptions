import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const HideFormButton = ({ onClick }) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{
          color: "#7a9bb1",
          borderColor: "#DAD0C2",
          fontWeight: "bold",
          fontSize: "14px",
          marginLeft: "50px",
          height: "50px",
          marginTop: "15px",
          marginBottom: "0px",
        }}
      >
        Schowaj pytania
      </Button>
    </Stack>
  );
};
