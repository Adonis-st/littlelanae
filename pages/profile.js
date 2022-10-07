import { useEffect, useState } from 'react';
import { useAuth, upload } from '../utils/firebase';

export default function profile() {
	const currentUser = useAuth();
	const [photo, setPhoto] = useState();
	const [photoURL, setPhotoURL] = useState('/images/profile.jpeg');

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setPhoto();
		}
	};
	const handleClick = () => {};

	useEffect(() => {
		if (currentUser && currentUser.photoURL) {
			setPhotoURL(currentUser.photoURL);
		}
	}, [currentUser]);
	return (
		<div>
			<input type='file' onChange={handleChange} />
			<button onClick={handleClick}>Upload</button>
			<img className='h-10 w-10 rounded-full' src={photoURL} alt='avatar' />
		</div>
	);
}
