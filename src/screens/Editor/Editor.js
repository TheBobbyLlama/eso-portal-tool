import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TownEditingPanel from "./components/TownEditingPanel/TownEditingPanel";
import Toolbar from "./components/Toolbar/Toolbar";

import { authSelectors } from "../../store/authSlice";
import { townActions, townSelectors } from "../../store/townSlice";

import "./Editor.css";

function Editor() {
	const user = useSelector(authSelectors.user);
	const townData = useSelector(townSelectors.working);
	const [town, setTown] = useState(user.towns.length ? user.towns[0] : undefined);
	const dispatch = useDispatch();

	// Retrieve release town data on component load.
	useEffect(() => {
		dispatch(townActions.loadReleaseData());
	}, [ dispatch ]);

	useEffect(() => {
		dispatch(townActions.loadTownData(town));
	}, [ dispatch, town ]);

	const modifiedText = townData?.modified ? `Last saved ${new Date(townData.modified).toLocaleString()}` : "";

	return <section id="editor">
		{(() => {
			if (user.towns.length === 1) {
				return <h2 title={modifiedText}>Editing {town}</h2>;
			} else if (!user.towns.length) {
				return <h2>You do not have access to any towns.</h2>
			} else {
				return <h2>Editing <select title={modifiedText} value={town} onChange={(e) => { setTown(e.target.value); }}>
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