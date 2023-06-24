import axios from 'axios';

async function fetchCities() {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/get-cities`
	);
	return response.data.data;
}

async function fetchAreas(cityId) {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/city/${cityId}/areas`
	);
	return response.data.data;
}

async function fetchStadiumData(authorizationCookie) {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/venue/get-stadium`,
		{
			headers: { Authorization: `Bearer ${authorizationCookie}` },
		}
	);
	return response.data.success ? response.data.data : false;
}

async function updateStadiumData(authorizationCookie, data) {
	const response = await axios.post(
		`${import.meta.env.VITE_API_URL}/venue/update-stadium?_method=PUT`,
		data,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data;
}

async function fetchProfileData(authorizationCookie) {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/profile`,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data.data;
}

async function updateProfileData(authorizationCookie, data) {
	const response = await axios.put(
		`${import.meta.env.VITE_API_URL}/update-profile`,
		data,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data;
}
async function updateProfileImage(authorizationCookie, data) {
	const response = await axios.post(
		`${import.meta.env.VITE_API_URL}/upload-profile-image`,
		data,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data;
}

async function updateProfilePassword(authorizationCookie, data) {
	const response = await axios.post(
		`${import.meta.env.VITE_API_URL}/change-password`,
		data,
		{
			headers: { Authorization: `Bearer ${authorizationCookie}` },
		}
	);
	return response.data;
}

async function fetchStadiumHours(authorizationCookie, stadiumId) {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/venue/stadium-hours/${stadiumId}`,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data.data;
}

async function addStadiumHour(authorizationCookie, data) {
	const response = await axios.post(
		`${import.meta.env.VITE_API_URL}/venue/add-stadium-hours`,
		data,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data;
}
async function deleteStadiumHour(authorizationCookie, hourId) {
	const response = await axios.delete(
		`${import.meta.env.VITE_API_URL}/venue/delete-stadium-hours/${hourId}`,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data;
}
async function updateStadiumImage(authorizationCookie, data) {
	const response = await axios.post(
		`${import.meta.env.VITE_API_URL}/venue/upload-stadium-image`,
		data,
		{
			headers: {
				Authorization: `Bearer ${authorizationCookie}`,
			},
		}
	);
	return response.data;
}
export {
	fetchCities,
	fetchAreas,
	fetchStadiumData,
	updateStadiumData,
	fetchProfileData,
	updateProfileData,
	updateProfileImage,
	updateProfilePassword,
	fetchStadiumHours,
	deleteStadiumHour,
	addStadiumHour,
	updateStadiumImage};
