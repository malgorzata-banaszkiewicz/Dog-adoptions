import React from "react";
import { useMediaQuery } from "@mui/material";

const MyComponent = () => {
	// Sprawdza, czy szerokość ekranu jest mniejsza lub równa 780px
	const isSmallScreen = useMediaQuery("(max-width: 780px)");

	return (
		<div>
			{isSmallScreen ? (
				<p>Ekran o małej szerokości</p>
			) : (
				<p>Ekran o dużej szerokości</p>
			)}
		</div>
	);
};

export default MyComponent;
