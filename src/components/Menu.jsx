import * as React from "react";
import { styled } from "@mui/system";

export const Menu = ({ children }) => {
	return <StyledMenu>{children}</StyledMenu>;
};

const StyledMenu = styled("header")(
	({}) => `
    background-color:  #F0DBDB ;
	width: 100vw;
	padding: 30px;
	font-size: 20px;
	display: flex;
	justify-content: space-evenly;
	align-content: center;
	position: fixed;
	top: 0px;
	z-index: 1;
	color: #5A5A72;

`
);
