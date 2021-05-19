var themeContainer = document.getElementById("theme-container");
var editing = true;
var activeTheme;
var themes = {
	"custom": {
		"name": "Custom"
	},
	"monokai": {
		"name": "Monokai",
		"background-primary": 1,
		"background-secondary": 0,
		"background-secondary-alt": 2,
		"background-tertiary": 3,
		"channeltextarea-background": 0,
		"background-floating": 3,
		"background-message-hover": 2,
		"background-accent": 4,
		"text-normal": 8,
		"text-muted": 5,
		"header-primary": 8,
		"header-secondary": 6,
		"channels-default": 5,
		"text-link": 10,
		"textbox-markdown-syntax": 7,
		"interactive-normal": 7,
		"interactive-hover": 8,
		"interactive-active": 9,
		"interactive-muted": 3,
		"background-modifier-hover": 1,
		"background-modifier-active": 3,
		"background-modifier-selected": 2,
		"background-modifier-accent": 4,
		"scrollbar-auto-thumb": 3,
		"scrollbar-auto-track": 0,
		"scrollbar-thin-thumb": 2,
		"brand-experiment": 11,
		"focus-primary": 10,
		"control-brand-foreground": 11,
		"deprecated-card-bg": 0,
		"deprecated-card-editable-bg": 0,
		"deprecated-quickswitcher-input-background": 2,
		"deprecated-quickswitcher-input-placeholder": 7,
		"deprecated-text-input-bg": 1,
		"deprecated-text-input-border": 5,
		"deprecated-text-input-border-hover": 7,
		"deprecated-text-input-border-disabled": 0
	}
};

function loadTheme(theme) {

	document.getElementById("theme-name-overwrite").innerHTML = themes[theme].name;
	document.getElementById("theme-name-txt").innerHTML = themes[theme].name;
	document.getElementById("theme-name-css").innerHTML = themes[theme].name;

	// Remove selected colors
	Object.keys(active).forEach((property, propertyIndex, properties) => {
		active[property].classList.remove("active");
	});
	active = {};

	// Swap colors to theme colors
	for (var i = 0; i < maxColors; i++) {
		document.documentElement.style.setProperty(`--p${i}`, `var(--${theme}${i})`);
	}

	// Select colors according to theme
	let containers = document.getElementsByClassName("color-option-container");
	for (var i = 0; i < containers.length; i++) {
		let container = containers[i];
		if (themes[theme][container.id] === undefined) {
			displayColor(`var(--default-${container.id})`, container.id);
			container.children[0].classList.add("active");
			active[container.id] = container.children[0];
		} else {
			displayColor(`var(--${theme}${themes[theme][container.id]})`, container.id);
			container.children[themes[theme][container.id] + 1].classList.add("active");
			active[container.id] = container.children[themes[theme][container.id] + 1];
		}
	};

	// Toggle theme buttons
	activeTheme.classList.remove("active");
	activeTheme = document.getElementById(`theme-${theme}`);
	activeTheme.classList.add("active");

	setEditing(theme === "custom");
	let backgroundColor = document.getElementById("selected-color").style.backgroundColor;
	showColorInfo(backgroundColor.substring(6, backgroundColor.length - 1));

	if (theme === "custom") {
		document.getElementById("overwrite").classList.add("disabled");
	} else {
		document.getElementById("overwrite").classList.remove("disabled");
	}
}

function downloadTheme(theme, extension) {
	let str = "";
	theme = theme.toLowerCase();
	if (themes[theme]["brand-experiment"] !== undefined) {
		let hex = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}${themes[theme]["brand-experiment"]}`).trim();
		if (hex == "") hex = "#0000";
		let rgba = hexToRGBA(hex);
		str += `html.oldBrand, html.newBrand {\n\t--brand-experiment: ${hex};\n`;
		if (rgba[3] === 1) {
			for (var i = 0; i < 4; i++) {
				let m = (12 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 100}: #${RGBAToHex([ Math.round((255 - rgba[0]) * m + rgba[0]), Math.round((255 - rgba[1]) * m + rgba[1]), Math.round((255 - rgba[2]) * m + rgba[2]) ])};\n`;
				m = (11 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 130}: #${RGBAToHex([ Math.round((255 - rgba[0]) * m + rgba[0]), Math.round((255 - rgba[1]) * m + rgba[1]), Math.round((255 - rgba[2]) * m + rgba[2]) ])};\n`;
				m = (10 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 160}: #${RGBAToHex([ Math.round((255 - rgba[0]) * m + rgba[0]), Math.round((255 - rgba[1]) * m + rgba[1]), Math.round((255 - rgba[2]) * m + rgba[2]) ])};\n`;
			}
			str += `\t--brand-experiment-500: ${hex};\n`;
			for (var i = 0; i < 4; i++) {
				let m = (12 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 530}: #${RGBAToHex([ Math.round(rgba[0] * m), Math.round(rgba[1] * m), Math.round(rgba[2] * m) ])};\n`;
				m = (11 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 560}: #${RGBAToHex([ Math.round(rgba[0] * m), Math.round(rgba[1] * m), Math.round(rgba[2] * m) ])};\n`;
				m = (10 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 600}: #${RGBAToHex([ Math.round(rgba[0] * m), Math.round(rgba[1] * m), Math.round(rgba[2] * m) ])};\n`;
			}
			for (var i = 5; i <= 95; i += 5) {
				str += `\t--brand-experiment-${`${i}`.padStart(2, '0')}a: rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${`0.${`${i}`.padStart(2, '0')}`});\n`;
			}
		} else {
			for (var i = 0; i < 4; i++) {
				let m = (12 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 100}: #${RGBAToHex([ Math.round((255 - rgba[0]) * m + rgba[0]), Math.round((255 - rgba[1]) * m + rgba[1]), Math.round((255 - rgba[2]) * m + rgba[2]), rgba[3] ])};\n`;
				m = (11 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 130}: #${RGBAToHex([ Math.round((255 - rgba[0]) * m + rgba[0]), Math.round((255 - rgba[1]) * m + rgba[1]), Math.round((255 - rgba[2]) * m + rgba[2]), rgba[3] ])};\n`;
				m = (10 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 160}: #${RGBAToHex([ Math.round((255 - rgba[0]) * m + rgba[0]), Math.round((255 - rgba[1]) * m + rgba[1]), Math.round((255 - rgba[2]) * m + rgba[2]), rgba[3] ])};\n`;
			}
			str += `\t--brand-experiment-500: ${hex};\n`;
			for (var i = 0; i < 4; i++) {
				let m = (12 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 530}: #${RGBAToHex([ Math.round(rgba[0] * m), Math.round(rgba[1] * m), Math.round(rgba[2] * m), rgba[3] ])};\n`;
				m = (11 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 560}: #${RGBAToHex([ Math.round(rgba[0] * m), Math.round(rgba[1] * m), Math.round(rgba[2] * m), rgba[3] ])};\n`;
				m = (10 - 3 * i) / 13;
				str += `\t--brand-experiment-${100 * i + 600}: #${RGBAToHex([ Math.round(rgba[0] * m), Math.round(rgba[1] * m), Math.round(rgba[2] * m), rgba[3] ])};\n`;
			}
			for (var i = 5; i <= 95; i += 5) {
				str += `\t--brand-experiment-${`${i}`.padStart(2, '0')}a: rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${(rgba[3] * i / 100).toFixed(2)});\n`;
			}
		}
		str += `}\n`;
	}
	str += ".theme-dark, .theme-light {\n";
	Object.keys(themes[theme]).forEach((property, propertyIndex, properties) => {
		if (themes[theme][property] !== undefined && property !== "name" && property !== "brand-experiment") {
			let value = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}${themes[theme][property]}`).trim();
			if (value != "") {
				str += `\t--${property}: ${value};\n`;
			} else {
				str += `\t--${property}: transparent;\n`;
			}
		}
	});
	str += "}\n";

	let a = document.createElement('a');
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
	a.setAttribute('download', `${theme}-theme.${extension}`);
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function overwriteCustomTheme(theme) {
	if (confirm(`You are about to overwrite your custom theme with ${theme}'s colors.`)) {
		theme = theme.toLowerCase();

		// Swap colors to theme colors
		for (var i = 0; i < maxColors; i++) {
			document.documentElement.style.setProperty(`--custom${i}`, `var(--${theme}${i})`);
		}

		// Select colors according to theme
		let containers = document.getElementsByClassName("color-option-container");
		for (var i = 0; i < containers.length; i++) {
			let id = containers[i].id;
			themes.custom[id] = themes[theme][id];
		};

		loadTheme("custom");
	}
}

function setEditing(bool) {
	editing = bool;
	if (bool && document.getElementById("selected-color").style.backgroundColor.startsWith("var(--p")) {
		document.getElementById("hex-input").disabled = false;
		document.getElementById("paste").classList.remove("disabled");
	} else {
		document.getElementById("hex-input").disabled = true;
		document.getElementById("paste").classList.add("disabled");
	}
}

Object.keys(themes).forEach((key, keyIndex, keys) => {
	let bgIndex = themes[key]["background-primary"];
	let colorIndex = themes[key]["text-normal"];

	let theme = document.createElement("div");
	theme.id = `theme-${key}`;
	theme.classList.add("theme");
	theme.style.backgroundColor = "var(--default-background-color)";
	theme.style.color = "var(--default-text-normal)";
	if (bgIndex !== undefined) theme.style.backgroundColor = `var(--${key}${bgIndex})`;
	if (colorIndex !== undefined) theme.style.color = `var(--${key}${colorIndex})`;
	theme.innerHTML = themes[key].name;
	theme.onclick = () => { loadTheme(key); };
	if (key === "custom") {
		activeTheme = theme;
		activeTheme.classList.add("active");
	}
	themeContainer.appendChild(theme);
});
