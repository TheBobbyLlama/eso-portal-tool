import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import HouseSelect from "../HouseSelect/HouseSelect";
import PortalEditor from "../PortalEditor/PortalEditor";

import { townActions } from "../../../../store/townSlice";
import { modalActions, modalKey } from "../../../../store/modalSlice";

import "./LocationEditingPanel.css";

function getDefaultFormValues(location) {
	if (location) {
		return { name: location.name, public: location.public || false, houseId: location.houseId, owner: location.owner, description: location.description || "" };
	}
}

function validateAccountName(name) {
	return !!name.match(/^@[\w]{3,20}$/);
}

function LocationEditingPanel({ location }) {
	const [formData, setFormData] = useState(getDefaultFormValues(location))
	const dispatch = useDispatch();
	const publicCheckRef = useRef(null);

	// Form values must be loaded manually when location changes.
	useEffect(() => {
		setFormData(getDefaultFormValues(location));
	}, [ location ]);

	if (!location) {
		return <></>;
	}

	const changeFormData = (e) => {
		const newData = { ...formData };
		
		if (e.target.type === "checkbox") {
			newData[e.target.name] = !!e.target.checked;
		} else if (e.target.name === "owner") {
			if (typeof newData.houseId === "string") {
				newData[e.target.name] = "";
			} else {
				newData[e.target.name] = `@${e.target.value.replace(/^@*/, "")}`;
			}
		} else if (e.target.name === "houseId") {
			if (e.target.value.length <= 3) {
				if (typeof newData.houseId === "string") {
					newData.name = "Unnamed Location";
				}

				newData[e.target.name] = Number(e.target.value);
			} else {
				newData[e.target.name] = e.target.value;
				newData.description = "";
				newData.name = e.target.value;
				newData.owner = "";
				newData.public = false;

			}
		} else {
			newData[e.target.name] = e.target.value;
		}
		setFormData(newData);
		dispatch(townActions.setLocationData({ locationId: location.id, data: newData }));
		// console.log(newData);
	}

	const promptDeleteLocation = () => {
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: `Delete ${location.name || "This Location"}?`,
				text: "This action cannot only be undone by reverting all unsaved changes.",
				action: townActions.deleteLocation({ locationId: location.id }),
			}
		}));
	}

	return <>
		<div id="locationEditor">
			<div><label>Current Location</label></div>
				<div id="locationForm">
				<div className="formGroup">
					<label>Name:</label>
					<input type="text" name="name" className={formData.name.length > 0 ? "" : "invalid"} placeholder="Unnamed Location" disabled={typeof formData.houseId === "string"} value={formData.name} onChange={changeFormData} />
				</div>
				<div className="formGroup" title="Public locations can be traveled to directly by clicking the addon icon.">
					<input type="checkbox" ref={publicCheckRef} name="public" disabled={typeof formData.houseId === "string"} checked={!!formData.public} onChange={changeFormData} />
					<label onClick={() => { publicCheckRef.current.click(); }}>Public</label>
				</div>
				<HouseSelect value={formData.houseId} onChange={changeFormData} />
				<div className="formGroup">
					<label>Owner:</label>
					<input type="text" name="owner" className={(typeof formData.houseId === "string") || (validateAccountName(formData.owner)) ? "" : "invalid"} disabled={typeof formData.houseId === "string"} value={formData.owner || ""} onChange={changeFormData} />
				</div>
				<div className="textBox">
					<textarea name="description" disabled={typeof formData.houseId === "string"} value={formData.description || ""} placeholder="Description (optional)" onChange={changeFormData}></textarea>
				</div>
			</div>
			<div className="formGroup deleteLoc">
				<button className="deleteButton" title="Delete Location" onClick={promptDeleteLocation}></button>
			</div>
		</div>
		<PortalEditor location={location} />
	</>;
}

export default LocationEditingPanel;