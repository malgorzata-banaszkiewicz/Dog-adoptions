import React from "react";
import { useTypes } from "../context/TypesContext";
import { StyledForm } from "./Home/StyledForm";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField , Button} from "@mui/material";

export const ClientPanelEditForm = ({
	handleUpdate,
	setEditId,
	setImageUpload,
	imgSrc,
	Id,
	Name,
	RaceType,
	Age,
	Energy,
	HairLength,
	HairType,
	Sex,
	Description,
	Size,
	formData,
	handleSelectBreed,
	handleSelectSize,
	handleSelectHairType,
	handleSelectHairLength,
	handleGender,
	handleEnergy,
	handleName,
	handleAge,
	handleDescription,
	isSmallScreen,
}) => {
	const types = useTypes();
	return (
		<StyledForm onSubmit={(e) => handleUpdate(e, Id)}>
			<input
				type='hidden'
				name='photoUrl'
				value={formData.image}
			/>
			<TextField
				sx={{
					width: `${isSmallScreen ? "350px" : "550px"}`,
					marginTop: "11px",
					zIndex: 0,
				}}
				label={"Zmień imię ( " + Name + " )"}
				defaultValue={Name}
				size='small'
				color='success'
				name='name'
				onChange={handleName}
			/>
			<FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<TextField
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						marginTop: "11px",
						zIndex: 0,
					}}
					id='breed'
					select
					color='success'
					label={"Zmień rasę"}
					defaultValue={RaceType}
					onChange={handleSelectBreed}>
					{types.dogsType
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.namePL}
							</MenuItem>
						))}
				</TextField>
			</FormControl>
			<TextField
				sx={{
					width: `${isSmallScreen ? "350px" : "550px"}`,
					marginTop: "15px",
					marginBottom: "10px",
					zIndex: 0,
				}}
				label={"Zmień wiek"}
				name='age'
				size='small'
				type='number'
				defaultValue={Age}
				color='success'
				onChange={handleAge}
			/>
			<FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<TextField
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						marginTop: "11px",
						zIndex: 0,
					}}
					id='Energy'
					select
					color='success'
					label={"Zmień poziom energii"}
					defaultValue={Energy}
					onChange={handleEnergy}>
					{types.energy
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.energyLevelPL}
							</MenuItem>
						))}
				</TextField>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<TextField
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						marginTop: "11px",
						zIndex: 0,
					}}
					id='hairLength'
					select
					color='success'
					label={"Zmień długość sierści"}
					defaultValue={HairLength}
					onChange={handleSelectHairLength}>
					{types.hairLength
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.hairLengthPL}
							</MenuItem>
						))}
				</TextField>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<TextField
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						marginTop: "11px",
						zIndex: 0,
					}}
					id='HairType'
					select
					color='success'
					label={"Zmień rodzaj sierści"}
					defaultValue={HairType}
					onChange={handleSelectHairType}>
					{types.hairType
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.hairTypePL}
							</MenuItem>
						))}
				</TextField>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<TextField
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						marginTop: "11px",
						zIndex: 0,
					}}
					id='gender'
					select
					color='success'
					label={"Zmień płeć"}
					defaultValue={Sex}
					onChange={handleGender}>
					{types.sex
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.gender}
							</MenuItem>
						))}
				</TextField>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<TextField
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						marginTop: "11px",
						zIndex: 0,
					}}
					id='Size'
					select
					color='success'
					label={"Zmień wielkość"}
					defaultValue={Size}
					onChange={handleSelectSize}>
					{types.size
						.sort((s) => s.id)
						.map((m) => (
							<MenuItem
								key={m.id}
								value={m.id}>
								{m.dogsSizePL}
							</MenuItem>
						))}
				</TextField>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
				<TextField
					sx={{
						width: `${isSmallScreen ? "350px" : "550px"}`,
						marginTop: "11px",
						zIndex: 0,
					}}
					label='Zmień opis psa'
					size='small'
					color='success'
					name='description'
					multiline
					defaultValue={Description}
					rows='4'
					onChange={handleDescription}
				/>
			</FormControl>
			<div
				style={{
					margin: "10px 0",
					minHeight: "200px",
					minWwidth: "300px",
					width: "550px",
					height: "400px",
				}}>
				<img
					src={imgSrc}
					style={{ width: "300px", height: "auto", marginLeft:"120px", borderRadius:"2%", border:"solid 4px beige" }}
				/>
			</div>
			<div>
  <input
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
        height: "40%",
        marginTop: "-170px",
      }}>
      Wybierz plik
    </Button>
  </label>
</div>


			<Button type='submit' variant="outlined"
            sx={{
              color: "#7a9bb1",
              borderColor: "#DAD0C2",
              fontWeight: "bold",
              fontSize: "16px",
              marginRight: "8px",
              height: "40%",
              marginTop: "-60px",
			  left:"10px"
            }}>Zatwierdź</Button>
			<Button variant="outlined"
            sx={{
              color: "#7a9bb1",
              borderColor: "#DAD0C2",
              fontWeight: "bold",
              fontSize: "16px",
              marginRight: "8px",
              height: "40%",
              marginTop: "20px",
			  marginBottom:"6px",
			  marginLeft:"10px"
            }}
				type='button'
				onClick={() => setEditId(null)}>
				Anuluj edycję
			</Button>
		</StyledForm>
	);
};
