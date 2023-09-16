import React from "react";
import { useEffect, useState } from "react";
import { db } from "../api/firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	updateDoc,
	query,
	where,
	and,
	or,
	getDoc,
} from "firebase/firestore";
import { ClientPanelEditForm } from "./ClientPanelEditForm";
import { useTypes } from "../context/TypesContext";
import { storage } from "../api/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Search } from "./Home/Search";
import { ClientPanelAddDog } from "./ClientPanelAddDog";
import { ClientPanelElement } from "./ClientPanelElement";
import { getDogs } from "./Api";
import { Button, Box, Modal } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export const ClientPanel = ({ email }) => {
	const types = useTypes();
	const org = types.organization.find((f) => f.email === email);
	const [search, setSearch] = useState(false);
	const [addDog, setAddDog] = useState(false);
	const [dogs, setDogs] = useState([]);
	const [editId, setEditId] = useState(null);
	const [criteria, setCriteria] = useState(null);
	const [imageUpload, setImageUpload] = useState(null);
	const [resId, setResId] = useState(null);
	const [resData, setResData] = useState(null);
	const [delResId, setDelResId] = useState(null);
	//add and edit dog form
	const [breed, setBreed] = useState("");
	const [openBreed, setOpenBreed] = useState(false);
	const [size, setSize] = useState("");
	const [openSize, setOpenSize] = useState(false);
	const [hairType, setHairType] = useState("");
	const [openHairType, setOpenHairType] = useState(false);
	const [hairLength, setHairLength] = useState("");
	const [openHairLength, setOpenHairLength] = useState(false);
	const [gender, setGender] = useState("");
	const [openGender, setOpenGender] = useState(false);
	const [energy, setEnergy] = useState("");
	const [openEnergy, setOpenEnergy] = useState(false);
	const [name, setName] = useState();
	const [age, setAge] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");

	const isSmallScreen = useMediaQuery("(max-width: 909px)");

	const formData = {
		raceType: breed,
		age: Number(age),
		name: name,
		energy: energy,
		sex: gender,
		hairLength: hairLength,
		hairType: hairType,
		size: size,
		description: description,
		image: image,
	};

	const setStates = (m) => {
		setBreed(m ? m.raceType : null);
		setSize(m ? m.size : null);
		setHairType(m ? m.hairType : null);
		setHairLength(m ? m.hairLength : null);
		setGender(m ? m.sex : null);
		setEnergy(m ? m.energy : null);
		setName(m ? m.name : null);
		setDescription(m ? m.description : null);
		setAge(m ? m.age : null);
		setImage(m ? m.image : null);
	};
	//breed select
	const handleSelectBreed = (event) => {
		setBreed(event.target.value);
	};

	//size select
	const handleSelectSize = (event) => {
		setSize(event.target.value);
	};

	//hairtype select

	const handleSelectHairType = (event) => {
		setHairType(event.target.value);
	};

	//hairlength select
	const handleSelectHairLength = (event) => {
		setHairLength(event.target.value);
	};

	//gender select
	const handleGender = (event) => {
		setGender(event.target.value);
	};

	//energy select
	const handleEnergy = (event) => {
		setEnergy(event.target.value);
	};

	//name
	const handleName = (event) => {
		setName(event.target.value);
	};

	//age
	const handleAge = (event) => {
		setAge(event.target.value);
	};

	//description
	const handleDescription = (event) => {
		setDescription(event.target.value);
	};

	const dogsCollection = collection(db, "Dogs");

	const getData = (q) => {
		onSnapshot(q, (querySnapshot) => {
			const dogs = getDogs(querySnapshot);
			setDogs(dogs);
		});
	};

	const getDataForReservation = async () => {
		const resRef = doc(db, "Reservations", resId.trim());
		const reservation = await getDoc(resRef);
		if (reservation.exists()) {
			setResData(reservation.data());
		}
	};

	useEffect(() => {
		if (resId) {
			getDataForReservation();
		} else {
			setResData(null);
		}
	}, [resId]);

	const deleteReservation = async () => {
		const delRef = doc(db, "Reservations", delResId.resId.trim());
		const dogRef = doc(db, "Dogs", delResId.id);
		await updateDoc(dogRef, { reservationId: null });
		await deleteDoc(delRef);
		setDelResId(null);
	};

	useEffect(() => {
		delResId && deleteReservation();
	}, [delResId]);

	useEffect(() => {
		const q = query(dogsCollection, where("organization", "==", org.id));
		getData(q);
		console.log(formData);
	}, []);

	useEffect(() => {
		if (criteria) {
			const queryArr = [];

			if (Number(criteria.age) != 0) {
				const ageArr = [];
				for (let i = 1; i < Number(criteria.age); i++) {
					ageArr.push(where("age", "==", i));
				}
				queryArr.push(or(...ageArr));
			}
			!!criteria.name?.length &&
				queryArr.push(where("name", "==", criteria.name));
			Number(criteria.raceType) != 0 &&
				queryArr.push(where("raceType", "==", Number(criteria.raceType)));
			Number(criteria.size) != 0 &&
				queryArr.push(where("size", "==", Number(criteria.size)));
			Number(criteria.energy) != 0 &&
				queryArr.push(where("energy", "==", Number(criteria.energy)));
			Number(criteria.hairLength) != 0 &&
				queryArr.push(where("hairLength", "==", Number(criteria.hairLength)));
			Number(criteria.hairType) != 0 &&
				queryArr.push(where("hairType", "==", Number(criteria.hairType)));
			Number(criteria.sex) != 0 &&
				queryArr.push(where("sex", "==", Number(criteria.sex)));

			const q = query(
				dogsCollection,
				and(where("organization", "==", org.id), ...queryArr)
			);
			getData(q);
		}
	}, [criteria]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (imageUpload == null) {
				addDoc(dogsCollection, getFormData(""));
			} else {
				const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
				await uploadBytes(imageRef, imageUpload).then((snapshot) => {
					getDownloadURL(snapshot.ref).then((url) => {
						addDoc(dogsCollection, getFormData(url));
					});
				});
			}

			setAddDog(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getFormData = (url) => {
		const dog = {
			raceType: breed,
			age: Number(age),
			name: name,
			energy: energy,
			sex: gender,
			hairLength: hairLength,
			hairType: hairType,
			size: size,
			description: description,
			organization: Number(org.id),
			image: !!url ? url : image,
		};

		return dog;
	};
	const handleUpdate = async (e, id) => {
		e.preventDefault();
		const dogRef = doc(dogsCollection, id);
		try {
			if (imageUpload == null) {
				await updateDoc(dogRef, getFormData(""));
			} else {
				const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
				await uploadBytes(imageRef, imageUpload).then((snapshot) => {
					getDownloadURL(snapshot.ref).then((url) => {
						updateDoc(dogRef, getFormData(url));
					});
				});
			}
		} catch (e) {
			console.log(e);
		}

		setEditId(null);
	};

	const deleteMe = (id) => {
		const dogRef = doc(dogsCollection, id);
		deleteDoc(dogRef);
	};

	return (
		<div style={{ listStyle: "none", marginTop: "200px", marginRight: "40px" }}>
			{!search ? (
				<Box
					style={{ display: "flex", justifyContent: "center", width: "100%" }}>
					<Button
						variant='outlined'
						sx={{
							color: "#7a9bb1",
							borderColor: "#DAD0C2",
							fontWeight: "bold",
							fontSize: "16px",
							marginRight: "8px",
							height: "50%",
							marginTop: "0px",
						}}
						onClick={() => {
							addDog && setAddDog(null);
							editId && setEditId(null);
							setSearch(!search);
						}}>
						Szukaj
					</Button>
				</Box>
			) : (
				<Search
					setSearch={setSearch}
					types={types}
					setCriteria={setCriteria}
					enableCitySerch={false}
				/>
			)}
			<ul style={{ listStyle: "none" }}>
				{dogs.map((m) => (
					<li key={m.id}>
						{editId != m.id ? (
							<ClientPanelElement
								deleteMe={deleteMe}
								setEditId={setEditId}
								types={types}
								m={m}
								setResId={setResId}
								setDelResId={setDelResId}
								resData={resData}
								resId={resId}
								setStates={setStates}
								Description={m.description}
								isSmallScreen={isSmallScreen}
								search={search}
								editId={editId}
								setAddDog={setAddDog}
								setSearch={setSearch}
							/>
						) : (
							<ClientPanelEditForm
								handleUpdate={handleUpdate}
								setEditId={setEditId}
								setImageUpload={setImageUpload}
								Name={m.name}
								RaceType={m.raceType}
								Age={m.age}
								Energy={m.energy}
								HairLength={m.hairLength}
								HairType={m.hairType}
								Sex={m.sex}
								Size={m.size}
								Description={m.description}
								formData={formData}
								Id={m.id}
								handleSelectBreed={handleSelectBreed}
								handleSelectSize={handleSelectSize}
								handleSelectHairType={handleSelectHairType}
								handleSelectHairLength={handleSelectHairLength}
								handleGender={handleGender}
								handleEnergy={handleEnergy}
								handleName={handleName}
								handleAge={handleAge}
								handleDescription={handleDescription}
								isSmallScreen={isSmallScreen}
								imgSrc={m.image}
							/>
						)}
					</li>
				))}
			</ul>
			{org.verified || dogs.length < 3 ? (
				!addDog ? (
					<Button
						variant='outlined'
						sx={{
							color: "#7a9bb1",
							borderColor: "#DAD0C2",
							fontWeight: "bold",
							fontSize: "16px",
							marginLeft: "10px",
							height: "50%",
							marginTop: "0px",
						}}
						onClick={() => {
							search && setSearch(false);
							editId && setEditId(null);
							setStates(null);
							setAddDog(!addDog);
						}}>
						Dodaj psa
					</Button>
				) : (
					<ClientPanelAddDog
						handleSubmit={handleSubmit}
						setImageUpload={setImageUpload}
						setAddDog={setAddDog}
						formData={formData}
						breed={breed}
						openBreed={openBreed}
						setOpenBreed={setOpenBreed}
						handleSelectBreed={handleSelectBreed}
						size={size}
						openSize={openSize}
						handleSelectSize={handleSelectSize}
						setOpenSize={setOpenSize}
						hairType={hairType}
						openHairType={openHairType}
						setOpenHairType={setOpenHairType}
						handleSelectHairType={handleSelectHairType}
						hairLength={hairLength}
						openHairLength={openHairLength}
						handleSelectHairLength={handleSelectHairLength}
						setOpenHairLength={setOpenHairLength}
						gender={gender}
						openGender={openGender}
						handleGender={handleGender}
						setOpenGender={setOpenGender}
						energy={energy}
						handleEnergy={handleEnergy}
						openEnergy={openEnergy}
						setOpenEnergy={setOpenEnergy}
						handleName={handleName}
						handleAge={handleAge}
						age={age}
						handleDescription={handleDescription}
						isSmallScreen={isSmallScreen}
					/>
				)
			) : null}
		</div>
	);
};
