import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigator = useNavigate();
	useEffect(() => {
		navigator('/profile');
	}, []);
	return <></>;
};

export default HomePage;
