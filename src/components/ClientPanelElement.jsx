import {
	Button,
	Typography,
	Card,
	CardContent,
	Box,
	useTheme,
	createTheme,
	Tooltip,
	Avatar,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const CardWrapper = styled(Card)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	overflow: "visible",
	width: "100%",
	backgroundColor: "#f1efe9",
	borderColor: "#DAD0C2",
	border: "solid #dfd9d2",
	marginLeft: "0",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		alignItems: "center",
	},
}));

const TextWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	marginTop: theme.spacing(2),
	height: "100%",
	width: "100%",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: theme.spacing(1),
	},
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	width: "80%",
	marginLeft: "40px",
	[theme.breakpoints.down("sm")]: {
		width: "100%",
		marginTop: theme.spacing(2),
	},
}));

export const ClientPanelElement = ({
	deleteMe,
	setEditId,
	types,
	m,
	setResId,
	setDelResId,
	resId,
	resData,
	setStates,
	Description,
	isSmallScreen,
	search,
	editId,
	setAddDog,
	setSearch,
}) => {
	return (
		<CardWrapper
			onMouseOver={() =>
				m.reservationId ? setResId(m.reservationId) : setResId(null)
			}>
			<CardContent>
				<Typography
					variant='body1'
					fontWeight='bold'
					color='#7C99AC'
					marginTop='20px'
					fontSize='24px'>
					Imię: {m.name}
				</Typography>
				<TextWrapper>
					<Avatar
						variant='rounded'
						src={m.image || `/src/assets/${"piesekbezzdjecia"}.png`}
						alt='piesek do adopcji'
						sx={{
							bgcolor: "#DBA39A",
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
							alignSelf: "flex-start",
							width: isSmallScreen ? "6em" : "15em",
							height: isSmallScreen ? "6em" : "15em",
							padding: "0.5rem",
						}}
					/>
					<ContentWrapper>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Rasa:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>
								{types.dogsType.find((f) => f.id == m.raceType)?.namePL}
							</span>
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Wiek:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>{m.age}</span>
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Energia:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>
								{types.energy.find((f) => f.id == m.energy)?.energyLevelPL}
							</span>
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Dłg. sierści:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>
								{
									types.hairLength.find((f) => f.id == m.hairLength)
										?.hairLengthPL
								}
							</span>
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Typ sierści:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>
								{types.hairType.find((f) => f.id == m.hairType)?.hairTypePL}
							</span>
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Płeć:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>
								{types.sex.find((f) => f.id == m.sex)?.gender}
							</span>
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Wielkość:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>
								{types.size.find((f) => f.id == m.size)?.dogsSizePL}
							</span>
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "black",
								fontWeight: "bold",
								fontSize: "18px",
								mb: 1,
							}}>
							<span style={{ color: "#978e92" }}>Opis psa:</span>{" "}
							<span style={{ color: "#E3B7A0" }}>
								{`${
									Description ||
									"Edytuj psa, by dodać opis. Psiaki z ciekawy opisem mają większe szanse na adopcję!"
								}`}
							</span>
						</Typography>
					</ContentWrapper>
				</TextWrapper>
				<Box
					sx={{
						display: "flex",
					}}>
					{m.reservationId && (
						<Tooltip
							title={
								m.reservationId == resId &&
								resData && (
									<>
										<Typography color='inherit'>
											{resData.name} {resData.surName}
										</Typography>
										<b>{"Telefon"}</b>
										{resData.phone} <br />
										<b>{"Email"}</b>
										{resData.email}
									</>
								)
							}>
							<Button
								variant='outlined'
								sx={{
									color: m.reservationId != null ? "#ff0000" : "#7a9bb1",
									borderColor: "#DAD0C2",
									fontWeight: "bold",
									fontSize: "16px",
									marginRight: "8px",
									height: "50%",
									marginTop: "10px",
								}}
								onClick={() =>
									setDelResId({ id: m.id, resId: m.reservationId })
								}>
								Anuluj rezerwację
							</Button>
						</Tooltip>
					)}
					<Button
						variant='outlined'
						sx={{
							color: "#7a9bb1",
							borderColor: "#DAD0C2",
							fontWeight: "bold",
							fontSize: "16px",
							marginRight: "8px",
							height: "50%",
							marginTop: "10px",
						}}
						onClick={() => deleteMe(m.id)}>
						Usuń
					</Button>
					<Button
						variant='outlined'
						sx={{
							color: "#7a9bb1",
							borderColor: "#DAD0C2",
							fontWeight: "bold",
							fontSize: "16px",
							marginLeft: "10px",
							height: "50%",
							marginTop: "10px",
						}}
						onClick={() => {
							search && setSearch(false);
							editId && setEditId(null);
							setAddDog(null);
							setStates(m);
							setEditId(m.id);
						}}>
						Edytuj
					</Button>
				</Box>
			</CardContent>
		</CardWrapper>
	);
};
