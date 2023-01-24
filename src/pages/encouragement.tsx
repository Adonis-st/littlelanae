import { useState } from "react";
import Head from "next/head";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Chat } from "../components/encourage/Chat";
import { Alert } from "flowbite-react";
import { Spinner } from "../components/Spinner";

export default function EncouragementPage() {
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(false);
	const [displayAlert, setDisplayAlert] = useState(true);

	if (loading) {
		return <Spinner />;
	}
	if (user) {
		return (
			<>
				<Head>
					<title>Encouragement</title>
					<meta name="description" content="Encouragement" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<div className="bg-white">
					<div className="relative mx-auto min-h-[90.5vh]  max-w-[1200px]">
						{displayAlert && (
							<div className="mt-1">
								<Alert
									color="success"
									onDismiss={() => setDisplayAlert((prevState) => !prevState)}>
									<span className="text-xs sm:ml-5 sm:text-base">
										{user.displayName} please leave some word of encourage for Ahsha
									</span>
								</Alert>
							</div>
						)}
						<Chat />
					</div>
				</div>
			</>
		);
	}
}
