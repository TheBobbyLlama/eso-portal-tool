// Strips all non-alphanumeric characters from a string.
export function dbTransform(input) {
	return input.replace(/[\s\W]/g, "").toLowerCase();
}

// Returns an array of strings outlining potential issues.
export function validateTown(town) {
	const result = [];

	town.locations.forEach((location) => {
		let addMe = "";

		if (location.portals.length) {
			location.portals.forEach((portal) => {
				if ((!addMe) && (!portal.nameOverride) && (!portal.destinations.length)) {
					addMe = `"${location.name}" location has an invalid portal - needs destination(s) or a name.`
				}
			})
		} else {
			addMe = `"${location.name}" location has no portals defined.`;
		}

		if (addMe) {
			result.push(addMe);
		}
	})

	return result;
}