import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../../../Pages/home/ui/HomePage.tsx";
import Approach from "../../../Pages/approach/ui/Approach.tsx";
import Projects from "../../../Pages/projects/ui/ProjectsPage.tsx";
import Header from "../../../Widgets/Header/Header.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Header />
				<HomePage />
			</>
		),
	},
	{
		path: "/approach",
		element: (
			<>
				<Header />
				<Approach />
			</>
		),
	},
	{
		path: "/projects",
		element: (
			<>
				<Header />
				<Projects />
			</>
		),
	},
]);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
