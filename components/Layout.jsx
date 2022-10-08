import { Children } from 'react';
import Nav from './Nav';

export default function Layout({ children }) {
	return (
		<div>
			<Nav />
			<main>{children}</main>
		</div>
	);
}
