import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTypes } from "../context/TypesContext";
import {
	Box,
	Button,
	Container,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { dogsCollection, getDogs } from "./Api";
import { StyledForm } from "./Home/StyledForm";
import { getLoginDetails, loginDetails } from "./Api";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export const Dog = ({ email }) => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [dog, setDog] = useState(null);
	const [open, setOpen] = useState(false);
	const [details, setDetails] = useState([]);
	const [res, setRes] = useState({
		name: "",
		surName: "",
		phone: "",
		email: "",
	});
	const resCollection = collection(db, "Reservations");
	const dogsCollection = collection(db, "Dogs");
	const types = useTypes();

	let org = null;
	if (!!email) {
		org = types.organization.find((f) => f.email === email);
	}

	useEffect(() => {
		onSnapshot(doc(db, "Dogs", state), (querySnapshot) => {
			setDog(querySnapshot.data());
		});
	}, []);

	const goBack = () => {
		navigate("/");
	};
	const getFormData = (e) => {
		e.preventDefault();

		const obj = {
			...res,
			dogId: state,
			organization: !org ? 0 : Number(org.id),
		};

		return obj;
	};

	const handleSubmit = async (e) => {
		try {
			await addDoc(resCollection, getFormData(e)).then((docRef) => {
				updateDoc(doc(dogsCollection, state), { reservationId: docRef.id });
				setOpen(false);
			});
			//
		} catch (error) {
			console.log(error);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = (e) => {
		e.preventDefault();
		setOpen(false);
	};
	if (dog == null) return <h1>Ładowanie</h1>;

	return (
		<Container
			maxWidth='1300'
			sx={{
				marginLeft: "10px",
				marginRight: "0px",
				height: "800px",
				marginTop: "140px",
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "40px",
				}}>
				<Box
					sx={{
						marginLeft: "10px",
						marginBottom: { xs: "20px", md: "0" },
					}}>
					<img
						src={dog.image}
						style={{
							borderRadius: "2%",
							width: { xs: "100px", md: "400px" },
							width: "400px",
							height: "auto",
							border: "0.3rem solid #F0DBDB",
							marginTop: "20px",
							marginLeft: "-300px",
							marginRight: "50px",
						}}
						alt='Dog'
					/>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						border: "0.3rem solid #F0DBDB",
						borderRadius: "3rem",
						padding: "20px",
						marginLeft: "50px",
						marginTop: "20px",
						flex: 1,
						maxWidth: "600px",
						"@media (max-width: 1440px)": {
							marginLeft: "10px",
							marginTop: "20px",
							flexDirection: "column",
						},
						"@media (max-width: 375px)": {
							marginBottom: "20px",
						},
					}}>
					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
							width: "600px",
						}}>
						Imię: {dog.name}
					</Typography>

					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Rasa: {types?.dogsType.find((f) => f.id == dog.raceType)?.namePL}
					</Typography>

					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Wiek: {dog.age}
					</Typography>

					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Energia:{" "}
						{types.energy.find((m) => m.id == dog.energy)?.energyLevelPL}
					</Typography>

					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Długość sierści:{" "}
						{types.hairLength.find((m) => m.id == dog.hairLength)?.hairLengthPL}
					</Typography>

					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Typ sierści:{" "}
						{types.hairType.find((m) => m.id == dog.hairType)?.hairTypePL}
					</Typography>

					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Płeć: {types.sex.find((m) => m.id == dog.sex)?.gender}
					</Typography>

					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Wielkość: {types.size.find((m) => m.id == dog.size)?.dogsSizePL}
					</Typography>
					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
						}}>
						Schronisko:{" "}
						{
							types.organization.find((f) => f.id == dog.organization)
								?.organization
						}
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "40px",
				}}>
				<Box
					sx={{
						display: "inline-flex",
						flexDirection: "column",
						border: "0.3rem solid #F0DBDB",
						borderRadius: "3rem",
						padding: "20px",
						marginLeft: "220px",
						marginTop: "40px",
						"@media (max-width: 1440px)": {
							marginLeft: "10px",
							marginTop: "20px",
							flexDirection: "column",
						},
						"@media (max-width: 375px)": {
							marginBottom: "20px",
						},
					}}>
					<Typography
						variant='body1'
						sx={{
							fontSize: "18px",
							fontWeight: "bold",
							marginBottom: "10px",
							maxWidth: "600px",
						}}>
						Opis: {dog.description}
					</Typography>
				</Box>
			</Box>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='parent-modal-title'
				aria-describedby='parent-modal-description'>
				<Box sx={{ ...style, width: 400 }}>
					<StyledForm onSubmit={handleSubmit}>
						<TextField
							sx={{
								// width: `${isSmallScreen ? "350px" : "550px"}`,
								marginTop: "11px",
								zIndex: 0,
							}}
							label='Podaj imię'
							size='small'
							color='success'
							name='firstName'
							value={res.name}
							onChange={(e) =>
								setRes((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
						<TextField
							sx={{
								// width: `${isSmallScreen ? "350px" : "550px"}`,
								marginTop: "11px",
								zIndex: 0,
							}}
							label='Podaj nazwisko'
							size='small'
							color='success'
							name='lastName'
							value={res.surName}
							onChange={(e) =>
								setRes((prev) => ({ ...prev, surName: e.target.value }))
							}
						/>
						<TextField
							sx={{
								// width: `${isSmallScreen ? "350px" : "550px"}`,
								marginTop: "11px",
								zIndex: 0,
							}}
							label='Podaj numer telefonu'
							size='small'
							color='success'
							name='phone'
							type='number'
							value={res.phone}
							onChange={(e) =>
								setRes((prev) => ({ ...prev, phone: e.target.value }))
							}
						/>
						<TextField
							sx={{
								// width: `${isSmallScreen ? "350px" : "550px"}`,
								marginTop: "11px",
								zIndex: 0,
							}}
							label='Podaj adres email'
							size='small'
							color='success'
							name='email'
							value={res.email}
							onChange={(e) =>
								setRes((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
						<Button type='submit'>Zapisz</Button>
						<Button onClick={handleClose}>Zamknij</Button>
					</StyledForm>
				</Box>
			</Modal>
			{org == null && dog.reservationId == null ? (
				<Button onClick={handleOpen}>Zarezerwuj psa</Button>
			) : null}
			{org != null &&
				!org.verified &&
				org.id != dog.organization &&
				dog.reservationId == null && (
					<button onClick={handleSubmit}>Rezerwuj</button>
				)}
			<Button
				variant='outlined'
				sx={{
					color: "#7a9bb1",
					borderColor: "#DAD0C2",
					fontWeight: "bold",
					fontSize: "16px",
					marginLeft: "10px",
					height: "50px",
					marginTop: "20px",
					left: "1300px",
				}}
				onClick={goBack}>
				Wróć
			</Button>
			{dog.reservationId != null && (
				<Typography
					variant='body1'
					sx={{
						display: "flex",
						width: "180px",
						color: "red",
						fontSize: "18px",
						fontWeight: "bold",
						border: "solid 2px ",
						paddingLeft: "8px",
						paddingRight: "8px",
						paddingTop: "4px",
						paddingBottom: "4px",
						marginBottom: "20px",
						borderRadius: "0.3rem",
						marginTop: "-45px",
						marginLeft: "1050px",
					}}>
					Pies zarezerwowany
				</Typography>
			)}
		</Container>
	);
};
