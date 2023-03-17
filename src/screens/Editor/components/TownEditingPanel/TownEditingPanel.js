import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { townActions, townSelectors } from "../../../../store/townSlice";

import spinner from "../../../../assets/images/spinner.gif";
import "./TownEditingPanel.css";

function TownEditingPanel({town}) {
	const [curLocation, setCurLocation] = useState(null);
	const townData = useSelector(townSelectors.working);
	const dispatch = useDispatch();

	useEffect(() => {
		if (townData?.locations?.length) {
			if (curLocation === null) {
				setCurLocation(townData.locations[0].id);
			} else {
				setCurLocation(townData.locations[townData.locations.length - 1].id);
			}
		}
	}, [townData?.locations?.length])

	if (!town) {
		return null;
	} else if (!townData) {
		return <img alt="loading" src={spinner} />;
	}

	const addLocation = () => {
		dispatch(townActions.addLocation());
	}

	return <div id="townEditor">
		<div id="locationSelection">
			<h3>Locations</h3>
			<div id="locationList" className="selectionList">
				{townData.locations.map(location => {
					return <div
						key={location.id}
						className={(location.id === curLocation) ? "active" : ""}
						onClick={() => { setCurLocation(location.id); }}
					>
						{location.name || "New Location"}
					</div>;
				})}
			</div>
			<button onClick={addLocation}>Add New</button>
		</div>
	</div>;
}

export default TownEditingPanel;