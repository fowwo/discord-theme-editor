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
	},
	"khaki-pants": {
		"name": "khaki pants",
		"background-primary": 10,
		"background-secondary": 0,
		"background-secondary-alt": 1,
		"background-tertiary": 9,
		"channeltextarea-background": 9,
		"background-floating": 9,
		"background-message-hover": 8,
		"background-mentioned": 9,
		"background-mentioned-hover": 8,
		"background-accent": 10,
		"text-normal": 4,
		"text-muted": 2,
		"header-primary": 8,
		"header-secondary": 8,
		"channels-default": 3,
		"text-link": 5,
		"textbox-markdown-syntax": 2,
		"interactive-normal": 6,
		"interactive-hover": 6,
		"interactive-active": 2,
		"interactive-muted": 2,
		"background-modifier-hover": 1,
		"background-modifier-active": 10,
		"background-modifier-selected": 3,
		"background-modifier-accent": 3,
		"scrollbar-auto-thumb": 1,
		"scrollbar-auto-track": 9,
		"scrollbar-thin-thumb": 3,
		"brand-experiment": 8,
		"focus-primary": 6,
		"control-brand-foreground": 7,
		"info-warning-foreground": 8
	},
	"peanut-butter": {
		"name": "peanut butter",
		"background-primary": 5,
		"background-secondary": 6,
		"background-secondary-alt": 0,
		"background-tertiary": 7,
		"channeltextarea-background": 4,
		"background-floating": 2,
		"background-message-hover": 6,
		"background-mentioned": 4,
		"background-mentioned-hover": 6,
		"background-accent": 1,
		"text-normal": 9,
		"text-muted": 8,
		"header-primary": 3,
		"header-secondary": 6,
		"channels-default": 8,
		"text-link": 3,
		"textbox-markdown-syntax": 7,
		"interactive-normal": 8,
		"interactive-hover": 0,
		"interactive-active": 3,
		"interactive-muted": 4,
		"background-modifier-hover": 4,
		"background-modifier-active": 1,
		"background-modifier-selected": 4,
		"background-modifier-accent": 3,
		"scrollbar-auto-thumb": 6,
		"scrollbar-auto-track": 4,
		"scrollbar-thin-thumb": 2,
		"brand-experiment": 0,
		"focus-primary": 9,
		"control-brand-foreground": 8,
		"info-warning-foreground": 3
	},
	"brick": {
		"name": "<b><i>brick</i></b>",
		"background-primary": 0,
		"background-secondary": 1,
		"background-secondary-alt": 6,
		"background-tertiary": 3,
		"channeltextarea-background": 2,
		"background-floating": 2,
		"background-message-hover": 2,
		"background-mentioned": 3,
		"background-mentioned-hover": 2,
		"background-accent": 2,
		"text-normal": 9,
		"text-muted": 6,
		"header-primary": 4,
		"header-secondary": 2,
		"channels-default": 5,
		"text-link": 5,
		"textbox-markdown-syntax": 4,
		"interactive-normal": 8,
		"interactive-hover": 6,
		"interactive-active": 7,
		"interactive-muted": 3,
		"background-modifier-hover": 0,
		"background-modifier-active": 3,
		"background-modifier-selected": 2,
		"background-modifier-accent": 6,
		"scrollbar-auto-thumb": 5,
		"scrollbar-auto-track": 1,
		"scrollbar-thin-thumb": 4,
		"control-brand-foreground": 7,
		"brand-experiment": 6,
		"focus-primary": 7,
		"info-warning-foreground": 6
	},
	"purble": {
		"name": "purble",
		"background-primary": 0,
		"background-secondary": 2,
		"background-secondary-alt": 1,
		"background-tertiary": 1,
		"channeltextarea-background": 1,
		"background-floating": 2,
		"background-message-hover": 1,
		"background-mentioned": 2,
		"background-mentioned-hover": 1,
		"background-accent": 6,
		"text-normal": 5,
		"text-muted": 8,
		"header-primary": 4,
		"header-secondary": 4,
		"channels-default": 4,
		"text-link": 6,
		"textbox-markdown-syntax": 7,
		"interactive-normal": 3,
		"interactive-hover": 6,
		"interactive-active": 8,
		"interactive-muted": 0,
		"background-modifier-hover": 1,
		"background-modifier-active": 1,
		"background-modifier-selected": 1,
		"background-modifier-accent": 6,
		"scrollbar-auto-thumb": 3,
		"scrollbar-auto-track": 1,
		"scrollbar-thin-thumb": 1,
		"focus-primary": 4,
		"control-brand-foreground": 8,
		"info-warning-foreground": 6
	},
	"grape-soda": {
		"name": "grape soda",
		"background-primary": 3,
		"background-secondary": 8,
		"background-secondary-alt": 9,
		"background-tertiary": 11,
		"channeltextarea-background": 2,
		"background-floating": 12,
		"background-message-hover": 5,
		"background-mentioned": 8,
		"background-mentioned-hover": 5,
		"background-accent": 10,
		"text-normal": 4,
		"text-muted": 9,
		"header-primary": 6,
		"header-secondary": 10,
		"channels-default": 4,
		"text-link": 1,
		"textbox-markdown-syntax": 7,
		"interactive-normal": 7,
		"interactive-hover": 4,
		"interactive-active": 4,
		"interactive-muted": 2,
		"background-modifier-hover": 10,
		"background-modifier-active": 11,
		"background-modifier-selected": 11,
		"background-modifier-accent": 0,
		"scrollbar-auto-thumb": 10,
		"scrollbar-auto-track": 3,
		"scrollbar-thin-thumb": 8,
		"brand-experiment": 9,
		"focus-primary": 4,
		"control-brand-foreground": 5,
		"info-warning-foreground": 5
	}
};

function loadTheme(theme) {

	let collection = document.getElementsByClassName("theme-name-span");
	for (var i = 0; i < collection.length; i++) collection.item(i).innerHTML = themes[theme].name;

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

function exportRaw(theme) {
	theme = theme.toLowerCase();
	let str = "";
	let color = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}0`).trim();
	let i = 0;
	while (color !== "") {
		str += `--${theme}${i}: ${color};\n`;
		i++;
		color = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}${i}`).trim();
	}
	str += `\n"${theme}": ${JSON.stringify(themes[theme], null, 4)}\n`;

	let a = document.createElement('a');
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
	a.setAttribute('download', `${theme}-theme-raw.txt`);
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

Object.keys(themes).forEach((key, keyIndex, keys) => {
	let bgpIndex = themes[key]["background-primary"];
	let bgsIndex = themes[key]["background-secondary"];
	let bgtIndex = themes[key]["background-tertiary"];
	let colorIndex = themes[key]["text-normal"];

	let theme = document.createElement("div");
	theme.id = `theme-${key}`;
	theme.classList.add("theme");
	theme.style.backgroundImage = "linear-gradient(#fff2, #0000 25%, #0005), linear-gradient(to right, var(--default-background-primary), var(--default-background-secondary), var(--default-background-tertiary))";
	theme.style.color = "var(--default-text-normal)";
	if (bgpIndex !== undefined && bgsIndex !== undefined && bgtIndex !== undefined) theme.style.backgroundImage = `linear-gradient(#fff2, #0000 25%, #0005), linear-gradient(to right, var(--${key}${bgpIndex}), var(--${key}${bgsIndex}), var(--${key}${bgtIndex}))`;
	if (colorIndex !== undefined) theme.style.color = `var(--${key}${colorIndex})`;
	theme.innerHTML = themes[key].name;
	theme.onclick = () => { loadTheme(key); };
	if (key === "custom") {
		activeTheme = theme;
		activeTheme.classList.add("active");
	}
	themeContainer.appendChild(theme);
});
