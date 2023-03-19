import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "../../../../store/authSlice";
import { modalActions, modalKey } from "../../../../store/modalSlice";
import { townActions, townSelectors } from "../../../../store/townSlice";
import { dbTransform } from "../../../../util";

import "./Toolbar.css";

function Toolbar() {
	const user = useSelector(authSelectors.user);
	const changed = useSelector(townSelectors.changed);
	const releaseInfo = useSelector(townSelectors.release);
	const workingTown = useSelector(townSelectors.working);
	const dispatch = useDispatch();

	if (!workingTown) {
		return null;
	}

	const townKey = dbTransform(workingTown.name);
	const canMerge = ((!changed) && (releaseInfo[townKey]?.modified !== workingTown.modified));

	const doSave = () => {
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: "Confirm",
				text: "Save your town information to the database?",
				action: townActions.saveTownData(),
			}
		}));
	}

	const doRevert = () => {
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: "Confirm",
				text: "The will reverse all unsaved changes and cannot be undone.  Do you wish to proceed?",
				action: townActions.resetWorkingData(),
			}
		}));
	}

	return <footer id="toolbar">
		<button disabled={!workingTown.locations.length}>Download</button>
		<button disabled={!changed} onClick={doSave}>Save</button>
		<button disabled={!changed} onClick={doRevert}>Revert</button>
		{user.permissions.indexOf("developer") > -1 && <button className="devButton" disabled={!canMerge}>Merge</button>}
		{/* {user.permissions.indexOf("admin") > -1 && <button className="adminButton">Add User</button>} */}
	</footer>;
}

export default Toolbar;