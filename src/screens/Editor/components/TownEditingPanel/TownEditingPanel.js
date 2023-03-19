import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LocationEditingPanel from "../LocationEditingPanel/LocationEditingPanel";

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

			dispatch(townActions.setLocationFilter([]));
		} else {
			setCurLocation(null);
		}
	}, [townData?.locations?.length])

	if (!town) {
		return null;
	} else if ((!townData) || ((townData.locations.length) && (!townData.locations.find(location => location.id === curLocation)))) {
		return <div id="spinner"><img alt="loading" src={spinner} /></div>;
	}

	const addLocation = () => {
		dispatch(townActions.addLocation());
	}

	const changeLocation = (newId) => {
		setCurLocation(newId);
		dispatch(townActions.setLocationFilter([]));
	}

	return <div id="townEditor">
		<div id="locationSelection">
			<h3>Locations</h3>
			<div id="locationList" className="selectionList">
				{townData.locations.map(location => {
					return <div
						key={location.id}
						className={(location.id === curLocation) ? "active" : ""}
						onClick={() => { changeLocation(location.id); }}
					>
						{location.name || "Unnamed Location"}
					</div>;
				})}
			</div>
			<button onClick={addLocation}>Add New</button>
		</div>
		{curLocation ? <div id="location">
			<LocationEditingPanel location={townData.locations.find(location => location.id === curLocation)} />
		</div> : <div />}
	</div>;
}

export default TownEditingPanel;