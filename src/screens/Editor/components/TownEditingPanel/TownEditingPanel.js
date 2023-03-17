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

	return <div id="townEditor">
		<div id="locationSelection">
			<h3>Locations</h3>
			<div id="locationList" className="selectionList">
			</div>
			<button>Add New</button>
		</div>
	</div>;
}

export default TownEditingPanel;