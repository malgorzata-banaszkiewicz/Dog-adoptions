import { Outlet } from "react-router";
import { useMediaQuery } from "@mui/material";

export const Auth = () => {
  const isDesktop = useMediaQuery("(min-width: 909px)");
  const dogAndOwner = "/dog-and-owner-on-paddleboard.jpg";
  const szczeniaki = "src/assets/puppies.jpg";
  return (
    <div
      style={{
        marginTop: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: isDesktop ? "start" : "center",
        paddingBottom: "550px",
        paddingLeft: isDesktop ? "100px" : "5px",
        paddingTop: "100px",
        backgroundImage: isDesktop ? `url(/pet.jpg)` : "unset",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "25px", fontWeight: "bold" }}>
          Panel klienta
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
