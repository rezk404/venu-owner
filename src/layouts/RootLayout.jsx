import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
const RootLayout = () => {
	const [cookies] = useCookies(['access_token']);
	const navigator = useNavigate();
	useEffect(() => {
		if (!cookies.access_token) {
			navigator('/login');
		}
	}, []);
	return (
		<div
			className="d-md-flex py-4 px-md-5 space"
			style={{
				minHeight: '100vh',
			}}
		>
			<Navbar />
			<div className="flex-grow-1 d-flex">
				<Outlet />
			</div>
		</div>
	);
};

export default RootLayout;
