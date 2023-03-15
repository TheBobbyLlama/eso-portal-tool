// Strips all non-alphanumeric characters from a string.
export function dbTransform(input) {
	return input.replace(/[\s\W]/g, "").toLowerCase();
}