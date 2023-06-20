import React, { useEffect, useState } from 'react';
import {
	fetchProfileData,
	updateProfileData,
	updateProfileImage,
	updateProfilePassword,
} from '../helpers/apiHelpers';
import { useCookies } from 'react-cookie';
import '../assets/css/ProfileData.css';
import {
	MDBBtn,
	MDBContainer,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBRow,
} from 'mdbreact';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const ProfileData = () => {
	const [cookies, setCookies] = useCookies(['access_token']);
	const [formData, setFormData] = useState({});
	const [newImage, setNewImage] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [oldPassword, setOldPassword] = useState(null);
	const [newPassword, setNewPassword] = useState(null);
	const [confirmNewPassword, setConfirmNewPassword] = useState(null);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const toggleShowOldPassword = () => {
		setShowOldPassword(!showOldPassword);
	};
	const toggleShowNewPassword = () => {
		setShowNewPassword(!showNewPassword);
	};
	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};
	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};
	useEffect(() => {
		fetchProfileData(cookies.access_token).then((data) => {
			setFormData(data);
		});
	}, []);

	const editableFieldNames = ['email', 'name', 'phone'];
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
		if (newImage) {
			let imageData = new FormData();
			imageData.append('profile_image', newImage);
			console.log(imageData);
			const data = await updateProfileImage(
				cookies.access_token,
				imageData
			);
			console.log(data);
			if (data.success) {
				toast.success(data.message);
				setFormData((prev) => {
					return { ...prev, image: URL.createObjectURL(newImage) };
				});
				setNewImage(false);
			} else {
				toast.error(data.message);
			}
		}

		const data = await updateProfileData(cookies.access_token, {
			name: formData.name,
			email: formData.email,
			age: formData.age,
			weight: formData.weight,
			height: formData.height,
			phone: formData.phone,
		});
		console.log(data);
		if (data.success) {
			toast.success(data.message);
		} else {
			toast.error(data.message);
		}
	};
	const handleSavePassword = async (e) => {
		e.preventDefault();
		if (newPassword !== oldPassword) {
			// show toast
		}
		const data = await updateProfilePassword(cookies.access_token, {
			old_password: oldPassword,
			new_password: newPassword,
			new_password_confirmation: confirmNewPassword,
		});
		if (data.success) {
			toggleModal();
			toast.success(data.message);
			setOldPassword('');
			setNewPassword('');
			setConfirmNewPassword('');
		} else {
			toast.error(data.message);
		}
		// show toast
	};
	return (
		<div className="container-fluid">
			<h1 className="text-center mb-4 mt-5">Profile Data</h1>
			<div className="row px-5">
				<div className="row d-flex">
					<div
						className="mb-3 d-flex flex-column justify-content-center align-items-start"
						style={{
							position: 'relative',
						}}
					>
						<label
							htmlFor="profileImage"
							className="form-label mb-3"
						>
							Profile Image
						</label>
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
										: formData.image
								}
								alt="profile"
								className=""
								style={{
									width: '10rem',
									height: '10rem',
									objectFit: 'cover',
									borderRadius: '100%',
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
							readOnly={!editableFieldNames.includes('name')}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							readOnly={!editableFieldNames.includes('email')}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="city" className="form-label">
							City
						</label>
						<input
							type="text"
							className="form-control"
							id="city"
							name="city"
							value={formData.city}
							onChange={handleChange}
							readOnly={!editableFieldNames.includes('city')}
						/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="mb-3">
						<label htmlFor="phone" className="form-label">
							Phone
						</label>
						<input
							type="text"
							className="form-control"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							readOnly={!editableFieldNames.includes('phone')}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="area" className="form-label">
							Area
						</label>
						<input
							type="text"
							className="form-control"
							id="area"
							name="area"
							value={formData.area}
							onChange={handleChange}
							readOnly={!editableFieldNames.includes('area')}
						/>
					</div>
					<div className="mb-3 d-flex flex-column">
						<label htmlFor="area" className="form-label">
							Password
						</label>
						<button
							className="btn btn-secondary"
							onClick={toggleModal}
						>
							Change Password
						</button>
					</div>
				</div>
				<div className="col-12 d-flex mb-3 justify-content-end">
					<button
						type="submit"
						className="btn btn-primary"
						onClick={handleSubmit}
					>
						Save
					</button>
				</div>
			</div>
			<MDBContainer>
				<MDBModal isOpen={modalOpen} toggle={toggleModal}>
					<MDBModalHeader toggle={toggleModal}>
						Change Password
					</MDBModalHeader>
					<MDBModalBody>
						<div className="container">
							<div className="mb-3">
								<label
									htmlFor="oldPassword"
									className="form-label"
								>
									Old Password
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="oldPassword"
										name="oldPassword"
										value={oldPassword}
										onChange={(e) =>
											setOldPassword(e.target.value)
										}
									/>
									<span
										className="input-group-text"
										onClick={toggleShowOldPassword}
										style={{
											cursor: 'pointer',
										}}
									>
										{showOldPassword ? (
											<FaEyeSlash />
										) : (
											<FaEye />
										)}
									</span>
								</div>
							</div>
							<div className="mb-3">
								<label
									htmlFor="newPassword"
									className="form-label"
								>
									New Password
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="newPassword"
										name="newPassword"
										value={newPassword}
										onChange={(e) =>
											setNewPassword(e.target.value)
										}
									/>
									<span
										className="input-group-text"
										onClick={toggleShowNewPassword}
										style={{
											cursor: 'pointer',
										}}
									>
										{showNewPassword ? (
											<FaEyeSlash />
										) : (
											<FaEye />
										)}
									</span>
								</div>
							</div>
							<div className="mb-3">
								<label
									htmlFor="confirmPassword"
									className="form-label"
								>
									Confirm Password
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="confirmPassword"
										name="confirmPassword"
										value={confirmNewPassword}
										onChange={(e) =>
											setConfirmNewPassword(
												e.target.value
											)
										}
									/>
									<span
										className="input-group-text"
										onClick={toggleShowConfirmPassword}
										style={{
											cursor: 'pointer',
										}}
									>
										{showConfirmPassword ? (
											<FaEyeSlash />
										) : (
											<FaEye />
										)}
									</span>
								</div>
							</div>
						</div>
						<MDBRow className="px-2">
							<MDBBtn
								color="primary"
								onClick={handleSavePassword}
							>
								Save
							</MDBBtn>
						</MDBRow>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>
		</div>
	);
};

export default ProfileData;
