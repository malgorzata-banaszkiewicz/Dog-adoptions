import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../api/firebase";
import { styled } from "@mui/system";

export const Navigation = ({ isAuth, email }) => (
	<StyledNav>
		<StyledUl>
			<li>
				<NavLink to='/'>Home</NavLink>
			</li>
			{!isAuth && (
				<>
					<li>
						<NavLink to='auth/login'>Zaloguj się</NavLink>
					</li>
					<li>
						<NavLink to='auth/register'>Zarejestruj się</NavLink>
					</li>
					<li>
						<NavLink to='auth/forgot-password'>Przypomnij hasło</NavLink>
					</li>
				</>
			)}
			{isAuth && (
				<>
					<li>
						<NavLink to='clientPanel'>Panel klienta</NavLink>
					</li>
					{/* </li>
          {email && <li>Your email: {email}</li>} */}
					<li
						onClick={() => signOut(auth)}
						style={{
							color: "#7a9bb1",
							cursor: "pointer",
						}}>
						Wyloguj się
					</li>
				</>
			)}
		</StyledUl>
	</StyledNav>
);

const StyledNav = styled("nav")(
	({}) => `
 
`
);
const StyledUl = styled("ul")(
	({}) => `
  display: flex;
  list-style-type: none;
  gap: 10px;
`
);

const StyledLi = styled("li")(
	({}) => `
  display: flex;
 
 
`
);
