import { useSelector } from "react-redux";
import { AppRouter } from "./App/providers/router/index.tsx";
import "./App/styles/index.scss";
import { Drawer } from "./Shared/ui/Drawer/Drawer.tsx";
import type { RootState } from "./App/store/index.ts";
import { useDispatch } from "react-redux";
import { closeDrawer } from "./App/store/slices/drawerSlice.ts";

const App = () => {
	const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
	const dispatch = useDispatch();

	return (
		<div>
			<AppRouter />
			<Drawer isOpen={isOpen} onClose={() => dispatch(closeDrawer())} />
		</div>
	);
};

export default App;
