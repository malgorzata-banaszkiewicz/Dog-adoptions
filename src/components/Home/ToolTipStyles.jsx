import { styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#F5EBE0",
    color: "#DBA39A",
    boxShadow: theme.shadows[1],
    fontSize: 18,
    fontWeight: "bold",
    padding: "1em",
    borderRadius: "3rem",
    border: "0.5rem solid #DBA39A",
    fontFamily: "Bagel Fat One, cursive",
  },
}));
