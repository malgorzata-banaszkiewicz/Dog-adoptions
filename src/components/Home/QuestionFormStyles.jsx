import { createTheme } from "@mui/material";
import { styled } from "@mui/system";

export const StyledFormDiv = styled("div")(
  ({ isBiggestScreen }) => `
        display: flex;
        flex-direction: column;
        margin: 0.1em;
        padding: 1em;
        width: ${isBiggestScreen ? "30%" : "fit-content"};
        height: 100%;
        background-color: #F5EBE0;
        border: 0.3rem solid #F0DBDB;
        border-radius: 3rem;
    `
);
