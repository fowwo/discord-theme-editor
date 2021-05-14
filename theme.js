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
		"background-floating": 5,
		"background-message-hover": 2,
		"background-accent": 4,
		"text-normal": 7,
		"text-muted": 5,
		"header-primary": 7,
		"header-secondary": 6,
		"channels-default": 5,
		"interactive-normal": 6,
		"interactive-hover": 7,
		"interactive-active": 8,
		"interactive-muted": 3,
		"background-modifier-hover": 1,
		"background-modifier-active": 3,
		"background-modifier-selected": 2,
		"background-modifier-accent": 4,
		"scrollbar-auto-thumb": 3,
		"scrollbar-auto-track": 0,
		"scrollbar-thin-thumb": 2
	}
};

function loadTheme(theme) {

	// Remove selected colors
	Object.keys(active).forEach((property, propertyIndex, properties) => {
		active[property].classList.remove("active");
	});
	active = {};

	// Swap colors to theme colors
	for (var i = 0; i <= 13; i++) {
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
}

function setEditing(bool) {
	editing = bool;
	document.getElementById("hex-input").disabled = !bool || document.getElementById("selected-color").style.backgroundColor.startsWith("var(--default-");
}

Object.keys(themes).forEach((key, keyIndex, keys) => {
	let bgIndex = themes[key]["background-primary"];
	let colorIndex = themes[key]["text-normal"];
	var backgroundColor, color;
	
	if (bgIndex !== undefined) backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${key}${themes[key]["background-primary"]}`);
	if (colorIndex !== undefined) color = getComputedStyle(document.documentElement).getPropertyValue(`--${key}${themes[key]["text-normal"]}`);

	let theme = document.createElement("div");
	theme.classList.add("theme");
	theme.style.backgroundColor = backgroundColor;
	theme.style.color = color;
	theme.innerHTML = themes[key].name;
	theme.onclick = () => {
		loadTheme(key);
		setEditing(key === "custom");
		let backgroundColor = document.getElementById("selected-color").style.backgroundColor;
		showColorInfo(backgroundColor.substring(6, backgroundColor.length - 1));
		activeTheme.classList.remove("active");
		activeTheme = theme;
		activeTheme.classList.add("active");
	};
	if (key === "custom") {
		activeTheme = theme;
		activeTheme.classList.add("active");
	}
	themeContainer.appendChild(theme);
});
