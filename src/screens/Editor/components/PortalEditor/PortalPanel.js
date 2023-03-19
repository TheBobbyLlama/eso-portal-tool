import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { modalActions, modalKey } from "../../../../store/modalSlice";
import { townActions, townSelectors } from "../../../../store/townSlice";

function getDefaultFormData(portal) {
	if (portal) {
		return {
			...portal,
			nameOverride: portal.nameOverride || "",
			portalDescription: portal.portalDescription || "",
			showMulti: portal.showMulti || false,
		};
	} else {
		return { destinations: [] };
	}
}

function PortalPanel({ location, portal }) {
	const [ formData, setFormData ] = useState(getDefaultFormData(portal));
	const townData = useSelector(townSelectors.working);
	const destRef = useRef(null);
	const multiRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		setFormData(getDefaultFormData(portal));
	}, [portal]);


	console.log(portal);

	if ((!location) || (!location.portals.find(port => port.id === portal?.id))) {
		return null;
	}

	const changePortalInfo = (e) => {
		const newData = { ...formData };
		
		if (e.target.type === "checkbox") {
			newData[e.target.name] = !!e.target.checked;
		} else {
			newData[e.target.name] = e.target.value;
		}
		setFormData(newData);
		dispatch(townActions.setPortalData({ locationId: location.id, portalId: portal.id, data: newData }));
		console.log(newData);
	}

	const addDestination = () => {
		const newData = { ...formData };
		const newLoc = destRef.current.value;

		if (newLoc) {
			newData.destinations = [ ...newData.destinations, Number(newLoc) ];
			setFormData(newData);
			dispatch(townActions.setPortalData({ locationId: location.id, portalId: portal.id, data: newData }));
		}
	}

	const removeDestination = (e) => {
		const newData = { ...formData };
		const killLoc = Number(e.target.dataset.key);
		const locIndex = newData.destinations.indexOf(killLoc);

		if (locIndex >= 0) {
			newData.destinations = [ ...newData.destinations ];
			newData.destinations.splice(locIndex, 1);
			setFormData(newData);
			dispatch(townActions.setPortalData({ locationId: location.id, portalId: portal.id, data: newData }));
		}
	}

	const pastePortalData = () => {
		navigator.clipboard.readText().then((text) => {
			const result = text.match(/Portal: {location = -1, destinations = {##}, x = (-?[0-9]+), y = (-?[0-9]+), z = (-?[0-9]+), cx = (-?[0-9]+\.[0-9]+), cy = (-?[0-9]+\.[0-9]+)}/);

			if (result?.length === 6) {
				const newData = { ...formData };

				newData.x = Number(result[1]);
				newData.y = Number(result[2]);
				newData.z = Number(result[3]);
				newData.mapX = Number(result[4]);
				newData.mapY = Number(result[5]);

				setFormData(newData);
			dispatch(townActions.setPortalData({ locationId: location.id, portalId: portal.id, data: newData }));
			}
		})
	}

	const showPortalHelp = () => {
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: "Portal Positioning",
				text: [
					"You can get portal positioning information in ESO using the Role-Play Town Portals addon.",
					"Click on the addon's house icon, as if you were going to travel to a town, but hold the Control key as you do so.  There will be a new option in the menu, \"Generate Portal text\", which will dump some information to System text in your chat.  The line you want looks like this:",
					"CODE:Portal: {location = -1, destinations = {##}, x = 66889, y = 9965, z = 49322, cx = 0.719289, cy = 0.443020},",
					"You will need to copy this line to clipboard (pChat addon is recommended), and then you can use the Paste button here to import the data from the line."
				],
				width: "600px",
			}
		}))
	}

	const promptDeletePortal = () => {
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: `Delete ${location.name || "This Poral"}?`,
				text: "This action cannot only be undone by reverting all unsaved changes.",
				action: townActions.deletePortal({ locationId: location.id, portalId: portal.id }),
			}
		}));
	}

	const destOptions = townData.locations.filter(loc => ((loc.id !== location.id) && (portal.destinations.indexOf(loc.id) < 0)));
	
	return <>
		<div id="portalPanel">
			<div id="destinationSelection">
				<h4>Destinations</h4>
				<div className="addList">
					{formData.destinations.map((dest) => {
						return <div key={dest}>
							<div>{townData.locations.find(loc => loc.id === dest)?.name || "WHAT"}</div>
							<button className="deleteButton" data-key={dest} onClick={removeDestination} />
						</div>;
					})}
				</div>
				<div className="formGroup">
					<select ref={destRef} disabled={!destOptions.length}>
						{destOptions.map((loc) => {
							return <option key={loc.id} value={loc.id}>{loc.name}</option>;
						})}
					</select>
					<button name="destinations" disabled={!destOptions.length} onClick={addDestination}>+</button>
				</div>
			</div>
			<div id="portalForm">
				<div id="portalCoords">
					<label>Position</label>
					<div>
						<div className="formGroup">
							<label>X:</label>
							<input type="text" readOnly value={formData.x} />
						</div>
						<div className="formGroup">
							<label>Y:</label>
							<input type="text" readOnly value={formData.y} />
						</div>
						<div className="formGroup">
							<label>Z:</label>
							<input type="text" readOnly value={formData.z} />
						</div>
					</div>
					<div>
						<div className="formGroup">
							<label>Radius:</label>
							<input type="number" min="1" max="20" placeholder="10" value={formData.radius} />
						</div>
						<div className="formGroup">
							<label>Map X:</label>
							<input type="text" readOnly value={formData.mapX} />
						</div>
						<div className="formGroup">
							<label>Map Y:</label>
							<input type="text" readOnly value={formData.mapY} />
						</div>
					</div>
					<div>
						<button onClick={pastePortalData}>Paste</button>
						<button id="portalHelp" onClick={showPortalHelp}></button>
					</div>
				</div>
				<div className="formGroup">
					<label>Name:</label>
					<input type="text" name="nameOverride" placeholder="Optional" value={formData.nameOverride} onChange={changePortalInfo} />
				</div>
				<div className="formGroup">
					<input ref={multiRef} type="checkbox" name="showMulti" checked={formData.destinations.length > 1 || formData.showMulti} disabled={formData.destinations.length > 1} onChange={changePortalInfo} />
					<label onClick={() => { multiRef.current.click(); }}>Show Destination List</label>
				</div>
				<div className="textBox">
					<textarea name="portalDescription" value={formData.portalDescription} placeholder="Description (optional)" onChange={changePortalInfo}></textarea>
				</div>
			</div>
		</div>
		<div>
			<button className="deleteButton" onClick={promptDeletePortal}>Delete</button>
		</div>
	</>
}

export default PortalPanel;