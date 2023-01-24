import { Nav } from './Nav';

export const Layout = ({ children }) => {
	return (
		<>
			<Nav />
			<main>{children}</main>
		</>
	);
};
