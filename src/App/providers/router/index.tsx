import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import PrivacyPage from "../../../Pages/Privacy/ui/PrivacyPage";
import Header from "../../../Widgets/Header/Header";
import Projects from "../../../Pages/Projects/ProjectsPage";

import PageTransition from "../../../Shared/ui/PageTransition/PageTransition";
import InitialLoader from "../../../Shared/ui/InitialLoader/InitialLoader";
import ProjectPage from "../../../Pages/Project/ui/ProjectPage";
import HomePage from "../../../Pages/Home/ui/HomePage";
import Approach from "../../../Pages/Approach/ui/Approach";

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
					element={
						<PageTransition>
							<Header minimal />
							<Projects />
						</PageTransition>
					}
				/>
				<Route
					path='/projects/:slug'
					element={
						<PageTransition>
							<Header />
							<ProjectPage />
						</PageTransition>
					}
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
