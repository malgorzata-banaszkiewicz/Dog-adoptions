import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { firebaseErrors } from "../../utils/firebaseErrors";
import { getFormData } from "../../utils/getFormData";
import { Form } from "./Form";
import { useMediaQuery } from "@mui/material";
import { Button } from "@mui/material";

export const Login = ({}) => {
  const isSmallScreen = useMediaQuery("(max-width: 909px)");
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = getFormData(e);
    signInWithEmailAndPassword(auth, email, password)
      .then((jwt) => {
        e.target.reset();
        console.log(jwt);
      })
      .catch((e) => {
        console.dir(e);
        alert(firebaseErrors[e.code]);
      });
  };

  return (
    <Form
      submitText={"Zaloguj się"}
      onSubmit={handleLogin}
      isSmallScreen={isSmallScreen}
    />
  );
};
