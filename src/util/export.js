import { zoneData } from "../data/zoneData";

const locationMap = {
	required: [
		"houseId",
		"owner",
		"name",
	],
	optional: [
		"description",
		"public",
	]
}

const portalMap = {
	required: [
		"x",
		"y",
		"z",
		"cx",
		"cy",
	],
	optional: [
		"radius",
		"nameOverride",
		"portalDescription",
		"showMulti",
	]
}

function fillStructure(input, map) {
	const result = {};

	map.required.forEach((key) => { result[key] = input[key]; });
	map.optional.forEach((key) => { if (input[key]) { result[key] = input[key]; } });

	return result;
}

function printDescription(description) {
	const match = description.match(/^(.{3}\w*)(\s.+)$/);
	let result;

	if (match.length === 3) {
		result = `|u25:0::${match[1]}|u${match[2]}`;
	} else {
		result =  description;
	}

	return result.replace(/"/g, "\\\"");
}

function createHouseMaps(data) {
	const result = {};

	const zoneList = [];
	let zoneCounter = 500;

	Object.values(data).forEach((town) => {
		town.locations.forEach((location) => {
			// Collect world zones for the end.
			if (typeof location.houseId === "string") {
				if (zoneList.indexOf(location.houseId) < 0) {
					zoneList.push(location.houseId);
				}
			} else if (!result[location.houseId]) {
				const curZone = zoneData.find((zone) => zone.id === location.houseId);

				result[location.houseId] = {
					id: location.houseId,
					name: curZone.name,
					map: curZone.map || "null",
				}
			}
		});
	});

	// World zone processing - IDs start at 500.
	zoneList.sort();
	zoneList.forEach((zoneArea) => {
		const newId = zoneCounter++;
		const curZone = zoneData.find((zone) => zone.name === zoneArea);
		result[newId] = {
			id: newId,
			name: zoneArea,
			map: curZone.map || "null",
		}
	});

	return result;
}

function createTownTable(data) {
	const result = [];
	let startIndex = 1;

	Object.values(data).forEach((town) => {
		result.push({
			name: town.name,
			startingLocation: startIndex,
		});

		startIndex += town.locations.length;
	});

	return result;
}

function createLocationTable(data, mapTable) {
	const result = [];

	Object.values(data).forEach((town, index) => {
		town.locations.forEach((location) => {
			const entry = fillStructure(location, locationMap);

			entry.internalId = location.id;
			entry.townId = index;

			if (typeof entry.houseId === "string") {
				entry.houseId = Object.values(mapTable).find((map) => map.name === entry.houseId).id;
				entry.name = "";
			}

			result.push(entry);
		});
	});

	return result;
}

function createPortalTable(data, locationTable) {
	const result = [];

	Object.values(data).forEach((town) => {
		town.locations.forEach((location) => {
			location.portals.forEach((portal) => {
				const entry = fillStructure(portal, portalMap);

				entry.location = locationTable.findIndex((loc) => loc.internalId === location.id);

				entry.destinations = [];

				portal.destinations.forEach((dest) => {
					entry.destinations.push(locationTable.findIndex((loc) => loc.internalId === dest));
				});

				result.push(entry);
			})
		});
	});
	return result;
}

export function exportAddonData(data) {
	const houseMapsTable = createHouseMaps(data);
	const townTable = createTownTable(data);
	const locationTable = createLocationTable(data, houseMapsTable);
	const portalTable = createPortalTable(data, locationTable);

	let result = "if not RTP then RTP = {} end\n\n";

	// HouseMaps
	result += "RTP.HouseMaps = {\n";
	Object.entries(houseMapsTable).forEach(([key, value]) => {
		result += `\t[${key}] = {id = ${key}, map = "${value.map}"},${"\n"}`;
	});
	result += "}\n";

	// Towns
	result += "RTP.Towns ={\n";
	townTable.forEach((town, index) => {
		result += `\t{id = ${index+1}, name = "${town.name}", startingLocation = ${town.startingLocation}},${"\n"}`;
	});
	result += "}\n";

	// Locations
	result += "RTP.Locations = {\n";
	locationTable.forEach((location, index) => {
		result += `\t[${index+1}] = {id = ${index+1}, houseId = ${location.houseId}, owner = "${location.owner}", townId = ${location.townId+1}, name="${location.name}"`;

		if (location.public) { result += `, public = ${location.public}`; }
		if (location.description) { result += `, description="${printDescription(location.description)}"`; }

		result += "},\n";
	});
	result += "}\n";

	// Portals
	result += "RTP.Portals = {\n";
	locationTable.forEach((location, index) => {
		const portalList = portalTable.filter((portal) => portal.location === index);

		if (portalList.length) {
			result += `\t[${index+1}] = { -- ${location.name}\n`;

			portalList.forEach((portal, pIndex) => {
				result += `\t\t{id = ${pIndex}, location = ${index+1}, destinations = {${portal.destinations.map((dest) => dest+1).join(",")}}, x = ${portal.x}, y = ${portal.y}, z = ${portal.z}, cx = ${portal.cx}, cy = ${portal.cy}`;

				if ((portal.radius) && (portal.radius !== 10)) { result += `, radius = ${portal.radius}`; }
				if (portal.nameOverride) { result += `, nameOverride = "${portal.nameOverride}"`; }
				if (portal.showMulti) { result += `, showMulti = ${portal.showMulti}`; }
				if (portal.portalDescription) { result += `, portalDescription = "${printDescription(portal.portalDescription)}"`; }

				result += "},\n";
			});

			result += "\t},\n";
		}
	});
	result += "}\n";

	// console.log(result);
	// return;

	const file = URL.createObjectURL(new Blob([ result ], { type: "text/plain" }));

	var a = document.createElement('a');
	a.download = "LocationData.lua";
	a.href = file;
	a.dataset.downloadurl = ["text/plain", a.download, a.href].join(':');
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}