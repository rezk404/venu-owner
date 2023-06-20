import { Link, useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';
import { useState } from 'react';
const Navbar = () => {
	const [isOpened, setIsOpened] = useState(false);
	const location = useLocation();
	return (
		<>
			<nav
				className="d-none d-md-block bg-light shadow col-md-2"
				style={{
					borderRadius: '30px',
					height: '95vh',
				}}
			>
				<div className="container-fluid d-flex flex-column pt-5 pb-3 h-100">
					<Link
						className="navbar-brand"
						style={{
							fontWeight: 'bold',
							fontSize: '1.5rem',
						}}
						to="/"
					>
						<img src="/logo.png" alt="logo" width={50} />
						Foora
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="pt-5 w-100 d-flex flex-column h-100 justify-content-between"
						id="navbarNav"
					>
						<ul className="navbar-nav d-flex flex-column">
							<li className="nav-item w-auto">
								<Link
									className={`nav-link ${
										location.pathname === '/profile' &&
										'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/profile"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="50"
										fill="currentColor"
										className="bi bi-person-fill"
										viewBox="0 0 16 16"
									>
										<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
									</svg>
									<p className="mb-0">Edit Profile</p>
								</Link>
							</li>
							<li className="nav-item w-auto">
								<Link
									className={`nav-link ${
										location.pathname === '/stadium-data' &&
										'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/stadium-data"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="50"
										fill="currentColor"
										className="bi bi-database-fill"
										viewBox="0 0 16 16"
									>
										<path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223Z" />
										<path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
										<path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
										<path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
									</svg>

									<p className="mb-0">Stadium Data</p>
								</Link>
							</li>
							<li className="nav-item w-auto">
								<Link
									className={`nav-link ${
										location.pathname ===
											'/stadium-hours' && 'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/stadium-hours"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="50"
										fill="currentColor"
										className="bi bi-clock-fill"
										viewBox="0 0 16 16"
									>
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
									</svg>
									<p className="mb-0">Stadium Hours</p>
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav d-flex flex-column">
							<li className="nav-item w-auto">
								<Link
									className={`nav-link ${
										location.pathname === '/logout' &&
										'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/logout"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="50"
										fill="currentColor"
										className="bi bi-box-arrow-left"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
										/>
										<path
											fillRule="evenodd"
											d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
										/>
									</svg>
									<p className="mb-0">Logout</p>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="px-4 d-flex d-md-none justify-content-between container-fluid mb-4">
				<Link
					to="/"
					className="navbar-brand"
					style={{
						fontWeight: 'bold',
						fontSize: '1.5rem',
					}}
				>
					{' '}
					<img src="/logo.png" alt="logo" width={46} />
					Foora
				</Link>
				{isOpened ? (
					<svg
						onClick={() => setIsOpened(false)}
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="currentColor"
						className="bi bi-x"
						viewBox="0 0 16 16"
					>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
					</svg>
				) : (
					<svg
						onClick={() => setIsOpened(true)}
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="currentColor"
						className="bi bi-list"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
						/>
					</svg>
				)}
			</div>
			<nav
				className="pb-4"
				style={{
					position: 'absolute',
					width: '100vw',
					backgroundColor: 'white',
					zIndex: 100,
				}}
				hidden={!isOpened}
			>
				<div className="container-fluid h-100 d-flex flex-column align-items-center">
					<div
						className="w-100 h-100 d-flex flex-column justify-content-between"
						id="navbarNav"
					>
						<ul className="navbar-nav d-flex flex-column">
							<li className="nav-item">
								<Link
									onClick={() => setIsOpened(false)}
									className={`nav-link ${
										location.pathname === '/profile' &&
										'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/profile"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-person-fill"
										viewBox="0 0 16 16"
									>
										<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
									</svg>
									<p className="mb-0">Edit Profile</p>{' '}
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => setIsOpened(false)}
									className={`nav-link ${
										location.pathname === '/stadium-data' &&
										'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/stadium-data"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-database-fill"
										viewBox="0 0 16 16"
									>
										<path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223Z" />
										<path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
										<path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
										<path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
									</svg>
									<p className="mb-0">Stadium Data</p>{' '}
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => setIsOpened(false)}
									className={`nav-link ${
										location.pathname ===
											'/stadium-hours' && 'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/stadium-hours"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-clock-fill"
										viewBox="0 0 16 16"
									>
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
									</svg>
									<p className="mb-0">Stadium Hours</p>{' '}
								</Link>
							</li>
						</ul>
						<ul className="navbar-nav d-flex flex-column">
							<li className="nav-item mt-auto">
								<Link
									onClick={() => setIsOpened(false)}
									className={`nav-link ${
										location.pathname === '/logout' &&
										'selected-nav'
									} d-flex align-items-center gap-3 justify-content-start`}
									to="/logout"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-box-arrow-left"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
										/>
										<path
											fillRule="evenodd"
											d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
										/>
									</svg>
									<p className="mb-0">Logout</p>{' '}
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
