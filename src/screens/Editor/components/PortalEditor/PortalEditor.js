import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { townActions, townSelectors } from "../../../../store/townSlice";

import PortalPanel from "./PortalPanel";

import "./PortalEditor.css";

function PortalEditor({location}) {
	const [ curPortal, setCurPortal ] = useState(location?.portals?.length ? location.portals[0].id : null);
	const townData = useSelector(townSelectors.working);
	const dispatch = useDispatch();

	useEffect(() => {
		setCurPortal(location.portals?.length ? location.portals[0].id : null);
	}, [ location.id ]);

	useEffect(() => {
		if (location?.portals?.length) {
			setCurPortal(location.portals[location.portals.length - 1].id);
		} else {
			setCurPortal(null);
		}
	}, [ location?.portals?.length ]);

	if (!location?.portals) {
		return null;
	}

	const changePortal = (id) => {
		setCurPortal(id);
	}

	const addPortal = () => {
		dispatch(townActions.addPortal({ locationId: location.id }));
	}

	const getPortalDescription = (portal) => {
		if (portal.nameOverride) {
			return portal.nameOverride;
		} else if (portal.destinations.length) {
			return portal.destinations.map(dest => { return townData.locations.find(loc => loc.id === dest)?.name || "Unnamed Location" }).join(", ");
		} else {
			return "New Portal";
		}
	}

	return <div id="portalEditor">
		<div id="portalSelection">
			<h3>Portals</h3>
			<div id="portalList" className="selectionList">
				{location.portals.map(portal => {
					return <div
						key={portal.id}
						className={(portal.id === curPortal) ? "active" : ""}
						onClick={() => { changePortal(portal.id); }}
					>
						{getPortalDescription(portal)}
					</div>;
				})}
			</div>
			<button onClick={addPortal}>Add New</button>
		</div>
		{curPortal && <PortalPanel location={location} portal={location.portals.find(portal => portal.id === curPortal)} />}
	</div>;
}

export default PortalEditor;