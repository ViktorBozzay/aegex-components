export function jsonValuesToArray(object: object[]): Array<string[]> {
	const array: Array<string[]> = [];
	for (let i = 0; i < object.length; i++) {
		array.push(Object.values(object[i]));
	}
	return array;
}
export function jsonKeysToArray(object: object[]): string[] {
	return object.length > 0 ? Object.keys(object[0]) : Object.keys(object);
}

/**
 * Compares item a and item b
 * @param  {object} a First item
 * @param  {object} b Second item
 * @param  {object} key Key name for the object
 * @param  {boolean} asAsceningOrder If true, returns the smaler first, otherwise inverted
 * @return {Number}      Returns the ordering place
 */
export function compareObjects(a: object, b: object, key: string, asAsceningOrder: boolean) {
	return asAsceningOrder
		? compareObjectsInAscendingOrder(a, b, key)
		: compareObjectsInDescendingOrder(a, b, key);
}
function compareObjectsInAscendingOrder(a: any, b: any, key: string) {
	const itemA = typeof a[key] === typeof 'string' ? a[key].toLowerCase() : a[key];
	const itemB = typeof b[key] === typeof 'string' ? b[key].toLowerCase() : b[key];

	return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
}
function compareObjectsInDescendingOrder(a: any, b: any, key: string) {
	const itemA = typeof a[key] === typeof 'string' ? a[key].toLowerCase() : a[key];
	const itemB = typeof b[key] === typeof 'string' ? b[key].toLowerCase() : b[key];

	return itemA < itemB ? 1 : itemA > itemB ? -1 : 0;
}
