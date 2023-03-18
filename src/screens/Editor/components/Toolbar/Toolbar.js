import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "../../../../store/authSlice";
import { townSelectors } from "../../../../store/townSlice";
import { dbTransform } from "../../../../util";

import "./Toolbar.css";

function Toolbar() {
	const user = useSelector(authSelectors.user);
	const changed = useSelector(townSelectors.changed);
	const prodInfo = useSelector(townSelectors.production);
	const workingTown = useSelector(townSelectors.working);

	if (!workingTown) {
		return null;
	}

	const townKey = dbTransform(workingTown.name);
	const canMerge = ((!changed) && (prodInfo[townKey]?.modified !== workingTown.modified));

	return <footer id="toolbar">
		<button disabled={!workingTown.locations.length}>Download</button>
		<button disabled={!changed}>Save</button>
		<button disabled={!changed}>Revert</button>
		{user.permissions.indexOf("developer") > -1 && <button className="devButton" disabled={!canMerge}>Merge</button>}
		{user.permissions.indexOf("admin") > -1 && <button className="adminButton">Users</button>}
	</footer>;
}

export default Toolbar;