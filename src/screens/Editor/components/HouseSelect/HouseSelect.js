import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { modalActions, modalKey } from "../../../../store/modalSlice";

import { townSelectors } from "../../../../store/townSlice";
import { zoneData, sizeData } from "../../../../data/zoneData";

import "./HouseSelect.css";

function HouseSelect({value, onChange }) {
	const filter = useSelector(townSelectors.filter);
	const dispatch = useDispatch();

	const zoneList = zoneData.filter((curZone) => {
		return ((!filter?.length) || (filter.indexOf(curZone.style) > -1));
	}).sort(function(a, b) {
		if ((a.size === "Zone") && (b.size !== "Zone")) {
			return 1;
		} else if ((a.size !== "Zone") && (b.size === "Zone")) {
			return -1;
		} else {
			return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
		}
	});
	const curZone = zoneList.find(zone => zone.id == value || zone.name === value);

	// const [ curZone, setCurZone ] = useState(zoneList.find(zone => zone.id == value || zone.name === value));

	useEffect(() => {
		// const tmpZone = zoneList.find(zone => zone.id == value || zone.name === value);

		// console.log(tmpZone);

		if (!curZone) {
			// setCurZone(zoneList[0]);
			onChange({ target: { name: "houseId", value: zoneList[0].id || zoneList[0].name } });
		}
	}, [ curZone, filter ]);

	if (!curZone) { return null; }

	const houseHint = (curZone?.size !== "Zone") ? `${sizeData[curZone.size].playerCap} Player House` : null;

	const showFilterModal = () => {
		dispatch(modalActions.showModal({ key: modalKey.houseStyle }));
	}

	const showWarningModal = () => {
		console.log("Hi!");
		dispatch(modalActions.showModal({
			key: modalKey.generic,
			data: {
				title: "Help Needed!",
				text: [
					"This house is missing some information needed to be fully compatible with the addon!  If you own this house, please visit it and Ctrl-click the addon's house icon.  Choose \"Generate Portal text\" and collect the Map line that looks like this:",
					"CODE:Map: [49] = {id = 49, map = \"glenumbra_base\"},",
					"Send it to Bobby on Discord, please!",
				],
				width: "500px",
			},
		}))
	}

	return <div id="houseSelect" className="formGroup">
		{curZone?.icon ? <img className={curZone?.map ? "" : "warning"} alt={"House Icon"} title={houseHint} src={curZone.icon} onClick={curZone?.map ? null : showWarningModal} /> : <img />}
		<select name="houseId" value={value} onChange={onChange}>
			{zoneList.map((zone) => {
				return <option key={zone.id || zone.name} value={zone.id || zone.name}>{zone.name}</option>
			})}
		</select>
		<button title="Filter Houses/Zones" onClick={showFilterModal}>∩</button>
	</div>;
}

export default HouseSelect;