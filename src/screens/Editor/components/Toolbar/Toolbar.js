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

	const doDownload = () => {
		const exportData = { ...releaseInfo };
		delete exportData.modified; // Don't let the export spin through this.
		exportData[townKey] = { ...workingTown };

		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: "Export LocationData.lua",
				text: [
					"This will create a new version of the addon's data file and save it to your computer. You can then replace the data file in your addon folder:",
					"CODE:Documents\\Elder Scrolls Online\\live\\AddOns\\RoleplayTownPortals\\LocationData.lua",
					"This can be done while the game is running, just use the /reloadui command to get the new data."
				],
				action: townActions.exportAddonData(exportData),
				width: "800px",
			}
		}));
	}

	const doSave = () => {
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: "Confirm",
				text: "Are you sure you want to save your changes?",
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

	const doMerge = () => {
		const mergedData = { ...releaseInfo };
		mergedData[townKey] = { ...workingTown };
		mergedData.modified = Date.now();

		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: "Merge for Release?",
				text: [
					"This will save this town's changes to the release branch.",
					"The Download button can then be used to pull the town data."
				],
				action: townActions.saveReleaseData(mergedData),
			}
		}));
	}

	return <footer id="toolbar">
		<button title="Download location data file for testing your changes" disabled={!workingTown.locations.length} onClick={doDownload}>Download</button>
		<button title="Save changes" disabled={!changed} onClick={doSave}>Save</button>
		<button title="Discard changes" disabled={!changed} onClick={doRevert}>Revert</button>
		{user.permissions.indexOf("developer") > -1 && <button className="devButton" title="Prepare release" disabled={!canMerge} onClick={doMerge}>Merge</button>}
		{/* {user.permissions.indexOf("admin") > -1 && <button className="adminButton">Add User</button>} */}
	</footer>;
}

export default Toolbar;