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
 * Changes the currently selected color.
 * @param {String} color - The new color.
 */
function setCurrentColor(color) {
	let property = document.getElementById("selected-color").style.backgroundColor.trim();
	property = property.substring(6, property.length - 1);
	document.documentElement.style.setProperty(`--${property}`, color);
	showColorInfo(property);
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
	let value = getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).trim();
	document.getElementById("selected-color").style.backgroundColor = `var(--${property})`;
	let hex = "";
	let rgba = [];
	if (value.startsWith("#")) {
		hex = value;
		rgba = hexToRGBA(hex);
	} else {
		let arr = value.split("(")[1];
		rgba = arr.substring(0, arr.length - 1).split(",").map((x) => parseFloat(x.trim()));
		if (value.startsWith("hsl")) {
			rgba[1] /= 100;
			rgba[2] /= 100;
			rgba = HSLAToRGBA(rgba);
		}
		hex = `#${RGBAToHex(rgba)}`;
	}
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
 * Converts an HSLA representation of a color
 * into an RGBA representation.
 * @param {Number[]} hsla - The HSLA color.
 */
function HSLAToRGBA(hsla) {
	let c = (1 - Math.abs(2 * hsla[2] - 1)) * hsla[1];
	let x = c * (1 - Math.abs((hsla[0] / 60) % 2 - 1));
	let m = hsla[2] - c / 2;
	let arr = [];
	if (hsla[0] < 60) {
		arr = [ c, x, 0 ];
	} else if (hsla[0] < 120) {
		arr = [ x, c, 0 ];
	} else if (hsla[0] < 180) {
		arr = [ 0, c, x ];
	} else if (hsla[0] < 240) {
		arr = [ 0, x, c ];
	} else if (hsla[0] < 300) {
		arr = [ x, 0, c ];
	} else {
		arr = [ c, 0, x ];
	}
	let r = Math.round(255 * (arr[0] + m));
	let g = Math.round(255 * (arr[1] + m));
	let b = Math.round(255 * (arr[2] + m));
	if (hsla.length === 3) return [ r, g, b ];
	return [ r, g, b, hsla[3] ];
}

/**
 * Converts an RGBA representation of a color
 * into an hexadecimal representation.
 * @param {Number[]} rgba - The RGBA color.
 */
function RGBAToHex(rgba) {
	let m = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: 'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f' };
	let r = "" + m[Math.floor(rgba[0] / 16)] + m[rgba[0] % 16];
	let g = "" + m[Math.floor(rgba[1] / 16)] + m[rgba[1] % 16];
	let b = "" + m[Math.floor(rgba[2] / 16)] + m[rgba[2] % 16];
	let a = "";
	if (rgba.length === 4) a = "" + m[Math.floor(255 * rgba[3] / 16)] + m[Math.floor(255 * rgba[3] % 16)];
	return `${r}${g}${b}${a}`;
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
