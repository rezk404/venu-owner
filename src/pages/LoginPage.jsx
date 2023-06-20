import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
	const [cookies, setCookies] = useCookies(['access_token']);
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const navigator = useNavigate();
	useEffect(() => {
		if (cookies.access_token) {
			navigator('/');
		}
	}, [cookies.access_token]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginResponse = await axios.post(
			`${import.meta.env.VITE_API_URL}/venue/login`,
			{
				email,
				password,
			}
		);
		if (loginResponse.data.success) {
			setCookies('access_token', loginResponse.data.data.token);
		}
	};

	return (
		<>
			<div
				style={{
					position: 'absolute',
					width: '100vw',
					height: '100vh',
				}}
			>
				<img src="/bg.jpg" className="w-100 h-100" id="bgimg" />
			</div>
			<div className="container">
				<div
					className="row justify-content-center align-items-center"
					style={{
						height: '100vh',
					}}
				>
					<div className="col-md-4">
						<div
							className="card"
							style={{
								background: 'linear-gradient(120deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(0,212,255,0.2) 100%)',
								color: 'white',
							}}
						>
							<div className="card-body px-5 py-5">
								<h3
									className="card-title text-center fw-bolder"
									style={{
										marginTop: '1rem',
									}}
								>
									Owner Login
								</h3>
								<p
									style={{ 
										marginBottom: '3rem',
										color: '#d4d4d4',
									}}
									className="card-text text-center"
								>
									Enter your details to sign in to your
									account
								</p>
								<form onSubmit={handleSubmit}>
									<div className="mb-3">
										<label
											htmlFor="email"
											className="form-label"
										>
											Email
										</label>
										<input
											type="email"
											className="form-control"
											id="email"
											value={email}
											onChange={handleEmailChange}
											placeholder="Enter your email"
											required
										/>
									</div>
									<div
										style={{
											marginBottom: '2rem',
										}}
									>
										<label
											htmlFor="password"
											className="form-label"
										>
											Password
										</label>
										<div className="input-group">
											<input
												type={
													showPassword
														? 'text'
														: 'password'
												}
												className="form-control"
												id="password"
												value={password}
												placeholder="Enter your password"
												onChange={handlePasswordChange}
												required
											/>
											<span
												className="input-group-text"
												onClick={toggleShowPassword}
												style={{
													cursor: 'pointer',
												}}
											>
												{showPassword ? (
													<FaEyeSlash />
												) : (
													<FaEye />
												)}
											</span>
										</div>
									</div>
									<div
										className="text-center"
										style={{
											marginBottom: '1.5rem',
										}}
									>
										<button
											type="submit"
											className="btn col-6 col-md-5 py-2"
											style={{
												backgroundColor: '#246e9a',
												color: 'white',
												fontWeight: 'bold',
											}}
										>
											Login
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
