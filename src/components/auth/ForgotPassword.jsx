import { Form } from "./Form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../api/firebase";
import { firebaseErrors } from "../../utils/firebaseErrors";
import { useMediaQuery } from "@mui/material";
import { Button } from "@mui/material";

export const ForgotPassword = () => {
  const isSmallScreen = useMediaQuery("(max-width: 909px)");
  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert("Sprawdź skrzynkę pocztową.");

    sendPasswordResetEmail(auth, e.target.email.value).catch((e) => {
      console.dir(e);
      alert(firebaseErrors[e.code]);
    });
  };

  return (
    <Form
      submitText={"Poproś o przypomnienie hasła"}
      isPasswordHidden
      onSubmit={handlePasswordReset}
      isSmallScreen={isSmallScreen}
    />
  );
};
