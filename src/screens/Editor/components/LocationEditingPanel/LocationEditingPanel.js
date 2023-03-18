import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import HouseSelect from "../HouseSelect/HouseSelect";

import { townActions } from "../../../../store/townSlice";
import { modalActions, modalKey } from "../../../../store/modalSlice";

import "./LocationEditingPanel.css";

function getDefaultFormValues(location) {
	if (location) {
		return { name: location.name, public: location.public || false, houseId: location.houseId, owner: location.owner };
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
			newData[e.target.name] = `@${e.target.value.replace(/^@*/, "")}`;
		} else {
			newData[e.target.name] = e.target.value;
		}
		setFormData(newData);
		dispatch(townActions.setLocationData({ locationId: location.id, data: newData }));
		console.log(newData);
	}

	const promptDeleteLocation = () => {
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: `Delete ${location.name || "This Location"}?`,
				text: "This action cannot be undone.",
				action: townActions.deleteLocation({ locationId: location.id }),
			}
		}));
	}

	return <div id="locationEditor">
		<div><label>Current Location</label></div>
			<div id="locationForm">
			<div className="formGroup">
				<label>Name:</label>
				<input type="text" name="name" className={formData.name.length > 0 ? "" : "invalid"} placeholder="Unnamed Location" value={formData.name} onChange={changeFormData} />
			</div>
			<div className="formGroup">
				<input type="checkbox" ref={publicCheckRef} name="public" checked={!!formData.public} onChange={changeFormData} />
				<label onClick={() => { publicCheckRef.current.click(); }}>Public</label>
			</div>
			<HouseSelect value={formData.houseId} onChange={changeFormData} />
			<div className="formGroup">
				<label>Owner:</label>
				<input type="text" name="owner" className={validateAccountName(formData.owner) ? "" : "invalid"} value={formData.owner} onChange={changeFormData} />
			</div>
		</div>
		<div className="formGroup deleteLoc">
			<button className="deleteButton" onClick={promptDeleteLocation}>Delete</button>
		</div>
	</div>;
}

export default LocationEditingPanel;