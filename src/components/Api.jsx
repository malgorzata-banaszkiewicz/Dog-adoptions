import { collection } from "firebase/firestore";
import { db } from "../api/firebase";

export const dogsCollection = collection(db, "Dogs");

export const getDogs = (querySnapshot) => {
	return querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};

export const provincesCollection = collection(db, "Provinces");

export const getProvinces = (querySnapshot) => {
	return querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};

export const loginDetails = collection(db, "AdditionalLoginDetails");

export const getLoginDetails = (querySnapshot) => {
	return querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
};
