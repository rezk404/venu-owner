import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LogoutPage = () => {
	const [cookies, setCookies, removeCookies] = useCookies(['access_token']);
	const navigator = useNavigate();
	useEffect(() => {
		if (cookies.access_token) {
			removeCookies('access_token');
			navigator('/login');
		}
	}, []);

	return <div>Logout</div>;
};

export default LogoutPage;
