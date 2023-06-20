/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import StadiumData from './pages/StadiumData.jsx';
import ProfileData from './pages/ProfileData.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import StadiumHours from './pages/StadiumHours.jsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/stadium-data',
				element: <StadiumData />,
			},
			{
				path: '/stadium-hours',
				element: <StadiumHours />,
			},
			{
				path: '/profile',
				element: <ProfileData />,
			},
			{
				path: '/logout',
				element: <LogoutPage />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Toaster />
		<RouterProvider router={router} />
	</React.StrictMode>
);
