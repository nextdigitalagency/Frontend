import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import PageTransition from "../../../Shared/ui/PageTransition/PageTransition";
import InitialLoader from "../../../Shared/ui/InitialLoader/InitialLoader";
import Header from "../../../Widgets/Header/Header";

import { Approach, HomePage, PrivacyPage } from "../../../Pages";

const isDev = import.meta.env.MODE === "development";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route
					path='/'
					element={
						<PageTransition>
							<Header />
							<HomePage />
						</PageTransition>
					}
				/>
				<Route
					path='/approach'
					element={
						<PageTransition>
							<Header />
							<Approach />
						</PageTransition>
					}
				/>
				<Route
					path='/projects'
					element={<Navigate to='/' replace />}
				/>
				<Route
					path='/projects/:slug'
					element={<Navigate to='/' replace />}
				/>
				<Route
					path='/privacy'
					element={
						<PageTransition>
							<PrivacyPage />
						</PageTransition>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
};

export const AppRouter = () => {
	const [isLoading, setIsLoading] = useState(!isDev);

	useEffect(() => {
		if (!isDev) {
			const timer = setTimeout(() => setIsLoading(false), 3000);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<BrowserRouter>
			{isLoading ? <InitialLoader onFinish={() => setIsLoading(false)} /> : <AnimatedRoutes />}
		</BrowserRouter>
	);
};
