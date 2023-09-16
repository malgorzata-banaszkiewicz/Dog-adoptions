import React from "react";
import { useTypes } from "../context/TypesContext";
import { Button, Input } from "@mui/material";
import { StyledForm } from "./Home/StyledForm";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

export const ClientPanelAddDog = ({
	handleSubmit,
	setImageUpload,
	setAddDog,
	formData,
	breed,
	openBreed,
	setOpenBreed,
	handleSelectBreed,
	handleSelectSize,
	setOpenSize,
	size,
	openSize,
	hairType,
	handleSelectHairType,
	setOpenHairType,
	openHairType,
	hairLength,
	openHairLength,
	handleSelectHairLength,
	setOpenHairLength,
	gender,
	openGender,
	handleGender,
	setOpenGender,
	energy,
	handleEnergy,
	openEnergy,
	setOpenEnergy,
	handleName,
	handleAge,
	age,
	handleDescription,
	isSmallScreen,
}) => {
	const types = useTypes();
	return (
		<StyledForm onSubmit={handleSubmit}>
			<TextField
				sx={{
					width: `${isSmallScreen ? "350px" : "550px"}`,
					marginTop: "11px",
					zIndex: 0,
				}}
				label='Podaj Imię'
				size='small'
				color='success'
				name='name'
				value={formData.name}
				onChange={handleName}
				required
			/>
			<FormControl
				required
				sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<InputLabel
					variant='filled'
					id='Breed'
					color='success'>
					Wybierz Rasę
				</InputLabel>
				<Select
					labelId='Breed'
					id='breed-select'
					open={openBreed}
					onClose={() => setOpenBreed(false)}
					onOpen={() => setOpenBreed(true)}
					value={breed}
					name='raceType'
					label='Rasa'
					key='dogBreed'
					onChange={handleSelectBreed}
					color='success'
					sx={{
						color: "#DBA39A",
						width: `${isSmallScreen ? "350px" : "550px"}`,
						paddingTop: "7px",
					}}>
					{types.dogsType
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.namePL}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<TextField
				required
				sx={{
					width: `${isSmallScreen ? "350px" : "550px"}`,
					marginTop: "15px",
					marginBottom: "10px",
					zIndex: 0,
				}}
				label='Podaj wiek'
				name='age'
				type='number'
				size='small'
				color='success'
				onChange={handleAge}
				value={age}
			/>
			<FormControl
				required
				sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<InputLabel
					id='energy'
					variant='filled'
					color='success'>
					Wybierz poziom energii
				</InputLabel>
				<Select
					labelId='energy'
					id='energy-select'
					open={openEnergy}
					onClose={() => setOpenEnergy(false)}
					onOpen={() => setOpenEnergy(true)}
					value={energy}
					label='Energia'
					key='energy'
					name='energy'
					onChange={handleEnergy}
					color='success'
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						color: "#DBA39A",
						paddingTop: "7px",
					}}>
					{types.energy
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.energyLevelPL}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<FormControl
				required
				sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<InputLabel
					id='hairLength'
					variant='filled'
					color='success'>
					Wybierz długość sierści
				</InputLabel>
				<Select
					labelId='hairLength'
					id='HairLength-select'
					open={openHairLength}
					onClose={() => setOpenHairLength(false)}
					onOpen={() => setOpenHairLength(true)}
					value={hairLength}
					label='Długość sierści'
					key='hairLength'
					name='hairLength'
					onChange={handleSelectHairLength}
					color='success'
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						color: "#DBA39A",
						paddingTop: "7px",
					}}>
					{types.hairLength
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.hairLengthPL}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<FormControl
				required
				sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<InputLabel
					id='HairType'
					variant='filled'
					color='success'>
					Wybierz rodzaj sierści
				</InputLabel>
				<Select
					labelId='HairType'
					id='HairType-select'
					open={openHairType}
					onClose={() => setOpenHairType(false)}
					onOpen={() => setOpenHairType(true)}
					value={hairType}
					label='Rodzaj sierści'
					key='HairType'
					onChange={handleSelectHairType}
					color='success'
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						color: "#DBA39A",
						paddingTop: "7px",
					}}>
					{types.hairType
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.hairTypePL}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<FormControl
				required
				sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<InputLabel
					id='gender'
					variant='filled'
					color='success'>
					Wybierz płeć
				</InputLabel>
				<Select
					labelId='gender'
					id='gender-select'
					open={openGender}
					onClose={() => setOpenGender(false)}
					onOpen={() => setOpenGender(true)}
					value={gender}
					label='Płeć'
					key='Gender'
					name='Gender'
					onChange={handleGender}
					color='success'
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						color: "#DBA39A",
						paddingTop: "7px",
					}}>
					{types.sex
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.gender}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<FormControl
				required
				sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<InputLabel
					id='Size'
					variant='filled'
					color='success'>
					Wybierz wielkość
				</InputLabel>
				<Select
					labelId='Size'
					id='size-select'
					open={openSize}
					onClose={() => setOpenSize(false)}
					onOpen={() => setOpenSize(true)}
					value={size}
					label='Wielkość'
					key='dogSize'
					name='size'
					onChange={handleSelectSize}
					color='success'
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						color: "#DBA39A",
						paddingTop: "7px",
					}}>
					{types.size
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.dogsSizePL}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<TextField
				sx={{
					width: `${isSmallScreen ? "350px" : "550px"}`,
					marginTop: "11px",
					zIndex: 0,
				}}
				label='Opis psa'
				size='small'
				color='success'
				name='description'
				multiline
				rows='4'
				value={formData.description}
				onChange={handleDescription}
			/>
			<Input
				type='file'
				id='upload-button'
				style={{ display: "none" }}
				onChange={(event) => {
					console.dir(event.target);
					setImageUpload(event.target.files[0]);
				}}
			/>
			<label htmlFor='upload-button'>
				<Button
					variant='outlined'
					component='span'
					sx={{
						color: "#7a9bb1",
						borderColor: "#DAD0C2",
						fontWeight: "bold",
						fontSize: "16px",
						marginLeft: "10px",
						height: "50%",
						marginTop: "20px",
					}}>
					Wybierz plik
				</Button>
			</label>
			<Button
				// onClick={handleSubmit}
				type='submit'
				variant='outlined'
				sx={{
					color: "#7a9bb1",
					borderColor: "#DAD0C2",
					fontWeight: "bold",
					fontSize: "16px",
					marginLeft: "10px",
					height: "50%",
					marginTop: "20px",
					marginBottom: "20px",
				}}>
				Dodaj psa
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
					marginTop: "20px",
					marginBottom: "20px",
				}}
				onClick={() => setAddDog(false)}>
				Anuluj
			</Button>
		</StyledForm>
	);
};
