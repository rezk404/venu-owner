import React, { useEffect, useState } from 'react';
import {
	fetchAreas,
	fetchCities,
	fetchStadiumData,
	updateStadiumData,
} from '../helpers/apiHelpers';
import { grassTypes, stadiumTypes } from '../helpers/dataHelpers';
import { useCookies } from 'react-cookie';
import '../assets/css/StadiumData.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const StadiumData = () => {
	const [cities, setCities] = useState([]);
	const [areas, setAreas] = useState([]);
	const [cookies, setCookies] = useCookies(['access_token']);
	const [formData, setFormData] = useState({});
	const [newImage, setNewImage] = useState(false);
	useEffect(() => {
		fetchStadiumData(cookies.access_token).then((data) => {
			if (data !== false) {
				fetchCities().then((citiesData) => {
					setCities(citiesData);

					const city = citiesData.find(
						(city) => city.name === data.city
					).id;
					let area;
					fetchAreas(city).then((areasData) => {
						setAreas(areasData);
						area = areasData.find(
							(area) => area.name === data.area
						).id;
						setFormData({
							...data,
							type: stadiumTypes.find(
								(type) => type.name === data.type
							).id,
							city,
							area,
							gross_type: grassTypes.find(
								(type) => type.name === data.gross_type
							).id,
						});
					});
				});
			}
		});
	}, []);
	useEffect(() => {
		fetchAreas(formData.city).then((areasData) => {
			setAreas(areasData);
		});
	}, [formData.city]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Perform saving/updating logic here
		console.log(formData);
		let dataToSubmit = new FormData();
		dataToSubmit.append('name', formData.name);
		dataToSubmit.append('type', formData.type);
		dataToSubmit.append('area_id', formData.area);
		dataToSubmit.append('city_id', formData.city);
		dataToSubmit.append('location_url', formData.location_url);
		dataToSubmit.append('space', formData.space);
		dataToSubmit.append('facebook_url', formData.facebook_url);
		dataToSubmit.append('instagram_url', formData.instagram_url);
		dataToSubmit.append('gross_type', formData.gross_type);
		if (newImage) {
			dataToSubmit.append('image', newImage);
		}

		const data = await updateStadiumData(
			cookies.access_token,
			dataToSubmit
		);
		if (data.success) {
			toast.success(data.message);
		} else {
			toast.error(data.message);
		}
	};

	return (
		<div className="container-fluid">
			<h1 className="text-center mb-4 mt-5">Stadium Data</h1>
			<form onSubmit={handleSubmit} className="row px-5">
				<div className="row">
					<div
						className="mb-3 d-flex flex-column justify-content-center align-items-center"
						style={{
							position: 'relative',
						}}
					>
						<div
							className="stadium-image"
							style={{
								position: 'relative',
							}}
						>
							<img
								src={
									newImage
										? URL.createObjectURL(newImage)
										: formData.images
								}
								alt="Stadium"
								className="stadium-image"
								style={{
									width: '27rem',
									height: '20rem',
									objectFit: 'contain',
								}}
							/>
							<div className="edit-button align-items-center justify-items-center">
								<button
									type="button"
									className="btn px-4"
									style={{
										backgroundColor: '#ff9800',
										color: 'white',
									}}
									onClick={() =>
										document
											.getElementById('imageInput')
											.click()
									}
								>
									Edit Image
								</button>
								<input
									type="file"
									id="imageInput"
									onChange={(e) =>
										setNewImage(e.target.files[0])
									}
									style={{
										display: 'none',
									}}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="location" className="form-label">
							Location Url
						</label>
						<input
							type="text"
							className="form-control"
							id="location"
							name="location"
							value={formData.location_url}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="type" className="form-label">
							Stadium Type
						</label>
						<select
							className="form-select"
							id="type"
							name="type"
							value={formData.type}
							onChange={handleChange}
						>
							{stadiumTypes.map((type) => {
								return (
									<option key={type.id} value={type.id}>
										{type.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="facebook" className="form-label">
							Facebook Url
						</label>
						<input
							type="text"
							className="form-control"
							id="facebook"
							name="facebook"
							value={formData.facebook_url}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="space" className="form-label">
							Space
						</label>
						<input
							type="number"
							className="form-control"
							id="space"
							name="space"
							value={formData.space}
							onChange={handleChange}
						/>
					</div>
					{/* Rest of the fields for the first column */}
				</div>
				<div className="col-md-6">
					<div className="mb-3">
						<label htmlFor="city" className="form-label">
							City
						</label>
						<select
							className="form-select"
							id="city"
							name="city"
							value={formData.city}
							onChange={handleChange}
						>
							{cities.map((city) => {
								return (
									<option key={city.id} value={city.id}>
										{city.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="area" className="form-label">
							Area
						</label>
						<select
							className="form-select"
							id="area"
							name="area"
							value={formData.area}
							onChange={handleChange}
						>
							{areas.map((area) => {
								return (
									<option key={area.id} value={area.id}>
										{area.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="gross_type" className="form-label">
							Grass Type
						</label>
						<select
							className="form-select"
							id="gross_type"
							name="gross_type"
							value={formData.gross_type}
							onChange={handleChange}
						>
							{grassTypes.map((type) => {
								return (
									<option key={type.id} value={type.id}>
										{type.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="instagram" className="form-label">
							Instagram Url
						</label>
						<input
							type="text"
							className="form-control"
							id="instagram"
							name="instagram"
							value={formData.instagram_url}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="col-12 d-flex mb-3 justify-content-end">
					<button type="submit" className="btn btn-primary">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default StadiumData;
