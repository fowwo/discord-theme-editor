var active = {};

/**
 * Sets the active color option of a given property.
 * @param {HTMLDivElement} element - The color option element.
 * @param {String} property - The color property.
 */
function setActiveColorOption(element, property) {
	active[property].classList.remove("active");
	active[property] = element;
	active[property].classList.add("active");
}

/**
 * Shows the color for a given property on the preview.
 * @param {String} color - The color.
 * @param {String} property - The color property.
 */
function displayColor(color, property) {
	document.documentElement.style.setProperty(`--${property}`, color);
}

/**
 * Shows the color information of the given property.
 * @param {String} property - The color property.
 */
function showColorInfo(property) {
	let container = document.getElementById("palette-container");
	container.style.visibility = "visible";
	container.style.opacity = "100%";
	let hex = getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).trim();
	let rgba = hexToRGBA(hex);
	document.getElementById("selected-color").style.backgroundColor = active[property].style.backgroundColor;
	document.getElementById("hex-input").value = hex.substring(1);
	document.getElementById("r-value").innerHTML = rgba[0];
	document.getElementById("g-value").innerHTML = rgba[1];
	document.getElementById("b-value").innerHTML = rgba[2];
	document.getElementById("a-value").innerHTML = rgba[3].toFixed(2);
}

/**
 * Converts a hexadecimal representation of a color
 * into an RGBA representation.
 * @param {String} hex - The hexadecimal color.
 */
function hexToRGBA(hex) {
	if (hex.startsWith("#")) hex = hex.substring(1);
	let m = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15 };
	if (hex.length === 3) return [ 17 * m[hex[0]], 17 * m[hex[1]], 17 * m[hex[2]], 1 ];
	if (hex.length === 4) return [ 17 * m[hex[0]], 17 * m[hex[1]], 17 * m[hex[2]], m[hex[3]] / 15 ];
	if (hex.length === 6) return [ 16 * m[hex[0]] + m[hex[1]], 16 * m[hex[2]] + m[hex[3]], 16 * m[hex[4]] + m[hex[5]], 1 ];
	if (hex.length === 8) return [ 16 * m[hex[0]] + m[hex[1]], 16 * m[hex[2]] + m[hex[3]], 16 * m[hex[4]] + m[hex[5]], (16 * m[hex[6]] + m[hex[7]]) / 255 ];
}

/**
 * Checks whether a color is a valid hexadecimal representation.
 * @param {String} hex - The hexadecimal color.
 */
function validHex(hex) {
	if (hex.startsWith("#")) hex = hex.substring(1);
	hex = hex.match(/^[0-9a-fA-F]+$/);
	return hex !== null && (
		hex[0].length === 3 ||
		hex[0].length === 4 ||
		hex[0].length === 6 ||
		hex[0].length === 8
	);
}

/**
 * Restricts input to certain keys that can edit text input.
 * - Backspace
 * - Enter
 * - End
 * - Home
 * - Arrow Keys
 * - Delete
 * @param {Event} event - The key event.
 * @returns {Boolean} True if the key passes the filter.
 */
function inputFilter(event) {
	let key = event.keyCode;
	if (
		key !== 8 && // Backspace
		key !== 13 && // Enter
		key !== 35 && // End
		key !== 36 && // Home
		(key < 37 || key > 40) && // Arrow Keys
		key !== 46 // Delete
	) {
		event.preventDefault();
		return false;
	}
	return true;
}

/**
 * Restricts input to hexadecimal characters.
 * @param {Event} event 
 * @returns {Boolean} True if the key passes the filter.
 */
function hexInputFilter(event) {
	let key = event.keyCode;
	if (
		(key < 48 || key > 57) && // 0 - 9
		(key < 65 || key > 70) // a - f
	) return inputFilter(event);
	return true;
}
