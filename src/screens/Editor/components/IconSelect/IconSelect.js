import { useState } from "react";

import iconData from "../../../../data/iconData";

import "./IconSelect.css";

function getIcon(iconData) {
	if (!iconData?.display) {
		return null;
	} else {
		const result = require(`../../../../assets/images/icons/${(iconData.display || "door.png")}`);
		return result;
	}
}

function IconSelect({value, onChange}) {
	const [picker, showPicker] = useState(false);

	const curIcon = iconData.find(icon => icon.name === value);

	const selectIcon = (key) => {
		onChange(key);
		showPicker(false);
	}

	return <div id="iconSelect">
		<h4>Icon</h4>
		<img src={getIcon(curIcon)} alt={value} title={value} onClick={() => { showPicker(true); }} />
		{picker && <>
			<div id="iconBG" onClick={() => { showPicker(false); }} />
			<div id="iconPicker">
				{iconData.map((icon) => {
					return <img key={icon.name} src={getIcon(icon)} alt={icon.name} title={icon.name} onClick={() => { selectIcon(icon.name); }} />;
				})}
			</div>
		</>}
	</div>;
}

export default IconSelect;