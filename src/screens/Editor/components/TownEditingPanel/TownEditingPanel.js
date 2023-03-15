import { useSelector } from "react-redux";

import { townSelectors } from "../../../../store/townSlice";

import spinner from "../../../../assets/images/spinner.gif";
import "./TownEditingPanel.css";

function TownEditingPanel({town}) {
	const loading = useSelector(townSelectors.busy);

	if (!town) {
		return null;
	} else if (loading) {
		return <img alt="loading" src={spinner} />;
	}

	return <div>Info for {town} will go here!</div>
}

export default TownEditingPanel;