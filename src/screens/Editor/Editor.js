import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TownEditingPanel from "./components/TownEditingPanel/TownEditingPanel";
import Toolbar from "./components/Toolbar/Toolbar";

import { authSelectors } from "../../store/authSlice";
import { townActions } from "../../store/townSlice";

import "./Editor.css";

function Editor() {
	const user = useSelector(authSelectors.user);
	const [town, setTown] = useState(user.towns.length ? user.towns[0] : undefined);
	const dispatch = useDispatch();

	// Retrieve production town data on component load.
	useEffect(() => {
		dispatch(townActions.loadProductionData());
	}, [ dispatch ]);

	useEffect(() => {
		dispatch(townActions.loadTownData(town));
	}, [ dispatch, town ]);

	return <section id="editor">
		{(() => {
			if (user.towns.length === 1) {
				return <h2>Editing {town}</h2>;
			} else if (!user.towns.length) {
				return <h2>You do not have access to any towns.</h2>
			} else {
				return <h2>Editing <select value={town} onChange={(e) => { setTown(e.target.value); }}>
						{user.towns.map(curTown => <option key={curTown}>{curTown}</option>)}
					</select>
				</h2>;
			}
		})()}
		<TownEditingPanel town={town} />
		<Toolbar />
	</section>
}

export default Editor;