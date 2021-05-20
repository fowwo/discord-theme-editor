function heading(text) {
	let heading = document.createElement("h1");
	heading.innerHTML = text;
	return heading;
}
function section(name, property, description = "") {
	let container = document.createElement("div");

	let heading = document.createElement("h3");
	heading.innerHTML = name;
	container.appendChild(heading);

	let p = document.createElement("p");
	p.innerHTML = description;
	container.appendChild(p);

	let options = document.createElement("div");
	options.id = property;
	options.className = "color-option-container";

	let defaultOption = createColorOption(property, `var(--default-${property})`);
	defaultOption.classList.add("default", "active");
	defaultOption.onclick = () => {
		if (editing) themes.custom[property] = undefined;
		document.getElementById("hex-input").disabled = true;
		document.getElementById("paste").classList.add("disabled");
		setActiveColorOption(defaultOption, property);
		showColorInfo(`default-${property}`);
	};
	active[property] = defaultOption;
	options.appendChild(defaultOption);
	for (var i = 0; i < maxColors; i++) {
		let index = i;
		let option = createColorOption(property, `var(--p${i})`);
		option.onclick = () => {
			if (editing) {
				themes.custom[property] = index;
				document.getElementById("hex-input").disabled = false;
				document.getElementById("paste").classList.remove("disabled");
			} else {
				document.getElementById("hex-input").disabled = true;
				document.getElementById("paste").classList.add("disabled");
			}
			setActiveColorOption(option, property);
			showColorInfo(`p${index}`);
		};
		options.appendChild(option);
	}
	container.appendChild(options);
	return container;
}
function text(text) {
	let p = document.createElement("p");
	p.innerHTML = text;
	return p;
}
function createColorOption(property, color) {
	let option = document.createElement("div");
	option.innerHTML = "✓";
	option.className = "color-option";
	option.style.backgroundColor = color;
	option.onmouseover = () => { displayColor(option.style.backgroundColor, property); };
	option.onmouseout = () => { displayColor(active[property].style.backgroundColor, property); }
	return option;
}
function hr() {
	return document.createElement("hr");
}

let parent = document.getElementById("main-preview-options");
[
	heading("Background"),
	section("Primary", "background-primary", "The primary background color, which is used behind chat messages and guild icons."),
	section("Secondary", "background-secondary", "The secondary background color, which is used behind the channel and member lists."),
	section("Secondary Alt", "background-secondary-alt", "The alternate secondary background color, which is used behind your user information."),
	section("Tertiary", "background-tertiary", "The tertiary background color, which is used for the search bar and used along the outside of the window."),
	section("Chat Input", "channeltextarea-background", "The color of the chat input box."),
	section("Floating", "background-floating", "The color of floating elements like tooltips and dropdown menus."),
	section("Message Hover", "background-message-hover", "The color of the background behind messages when hovering above them."),
	section("Mentioned", "background-mentioned", "The color of the background behind messages that mention you.<br><span style='color: #fb2a'>* See <b>Info Warning Foreground</b> under <b>Other</b> to change the small bar on the left of messages that mention you.</span>"),
	section("Mentioned Hover", "background-mentioned-hover", "The color of the background behind messages that mention you when hovering above them."),
	section("Accent", "background-accent", "The accent background color, which is used for things like replies, selecting emojis, and the keys when viewing keybinds."),
	hr(),
	heading("Text"),
	section("Normal", "text-normal", "The normal text color, which is used for chat messages and guild icons."),
	section("Muted", "text-muted", "The muted text color, which is used for chat timestamps, channel icons, and more."),
	section("Header Primary", "header-primary", "The primary header color, which is used for guild and channel headers and for your username in the user panel."),
	section("Header Secondary", "header-secondary", "The secondary header color, which is used for channel descriptions."),
	section("Channels", "channels-default", "The color of channel names as well as the color of status and member group names."),
	section("Links", "text-link", "The color of hyperlinks."),
	section("Markdown", "textbox-markdown-syntax", "The color used for markdown syntax, like the asterisks in *italics* and **bold**."),
	hr(),
	heading("Interactive"),
	section("Normal", "interactive-normal", "The normal interactive color, which is used for button icons."),
	section("Hover", "interactive-hover", "The hover interactive color is shown when hovering over interactive elements like buttons and channels."),
	section("Active", "interactive-active", "The active interactive color, which is used for toggled buttons and and the current channel."),
	section("Muted", "interactive-muted", "The active interactive color, which is used for muted channels and user embeds."),
	section("Background Hover", "background-modifier-hover", "The background color when hovering over interactive elements."),
	section("Background Active", "background-modifier-active", "The background color for active interactive elements like when holding down the mouse on channels in the channel list."),
	section("Background Selected", "background-modifier-selected", "The background color for selected interactive elements like channels in the channel list."),
	section("Background Accent", "background-modifier-accent", "The color of lines used to divide regions, such as the line marking a new day in text channels."),
	hr(),
	heading("Scrollbar"),
	section("Thumb", "scrollbar-auto-thumb", "The thumb color of the chat scrollbar."),
	section("Track", "scrollbar-auto-track", "The track color of the chat scrollbar."),
	section("Thin Thumb", "scrollbar-thin-thumb", "The thumb color of the thin scrollbar, which is seen when hovering over the channel and member lists."),
	section("Thin Track", "scrollbar-thin-track", "The track color of the thin scrollbar, which is seen when hovering over the channel and member lists."),
	hr()
].forEach((x) => { parent.appendChild(x); });

parent = document.getElementById("other-options");
[
	heading("Other"),
	section("Brand", "brand-experiment", "The <span style='color: #7289da'>blurple</span> color used throughout Discord. Choose the main color and the rest will be generated for you."),
	section("Focus", "focus-primary", "The color of the outline when focusing on elements (using Tab)."),
	section("Radio Button", "control-brand-foreground", "The color of active radio buttons."),
	section("Info Warning Foreground", "info-warning-foreground", "The foreground color of warning info boxes, but also the color of the small bar on the left of messages that mention you."),
	hr(),
	heading("Extra"),
	text("The following colors are either not important to change or I do not know where they are being used."),
	section("scrollbar-auto-scrollbar-color-thumb", "scrollbar-auto-scrollbar-color-thumb", ""),
	section("scrollbar-auto-scrollbar-color-track", "scrollbar-auto-scrollbar-color-track", ""),

	section("background-mobile-primary", "background-mobile-primary", ""),
	section("background-mobile-secondary", "background-mobile-secondary", ""),
	// section("elevation-stroke", "elevation-stroke", ""),
	// section("elevation-low", "elevation-low", "The default color for this property uses multiple colors, so the displayed information is incorrect."),
	// section("elevation-medium", "elevation-medium", ""),
	// section("elevation-high", "elevation-high", ""),
	section("logo-primary", "logo-primary", ""),
	// addSection("guild-header-text-shadow", "guild-header-text-shadow", ""),
	section("activity-card-background", "activity-card-background", ""),
	section("text-warning", "text-warning", ""),
	section("text-danger", "text-danger", ""),
	section("info-positive-background", "info-positive-background", ""),
	section("info-positive-foreground", "info-positive-foreground", ""),
	section("info-warning-background", "info-warning-background", ""),
	section("info-danger-background", "info-danger-background", ""),
	section("info-danger-foreground", "info-danger-foreground", ""),
	section("status-positive-background", "status-positive-background", ""),
	section("status-positive-text", "status-positive-text", ""),
	section("status-warning-background", "status-warning-background", ""),
	section("status-danger-background", "status-danger-background", ""),
	section("status-danger-text", "status-danger-text", ""),
	section("text-positive", "text-positive", ""),
	section("info-positive-text", "info-positive-text", ""),
	section("info-warning-text", "info-warning-text", ""),
	section("info-danger-text", "info-danger-text", ""),
	section("info-help-background", "info-help-background", ""),
	section("info-help-foreground", "info-help-foreground", ""),
	section("info-help-text", "info-help-text", ""),
	section("status-warning-text", "status-warning-text", ""),
	section("deprecated-card-bg", "deprecated-card-bg", ""),
	section("deprecated-card-editable-bg", "deprecated-card-editable-bg", ""),
	section("deprecated-store-bg", "deprecated-store-bg", ""),
	section("deprecated-quickswitcher-input-background", "deprecated-quickswitcher-input-background", ""),
	section("deprecated-quickswitcher-input-placeholder", "deprecated-quickswitcher-input-placeholder", ""),
	section("deprecated-text-input-bg", "deprecated-text-input-bg", ""),
	section("deprecated-text-input-border", "deprecated-text-input-border", ""),
	section("deprecated-text-input-border-hover", "deprecated-text-input-border-hover", ""),
	section("deprecated-text-input-border-disabled", "deprecated-text-input-border-disabled", ""),
	section("deprecated-text-input-prefix", "deprecated-text-input-prefix", "")
].forEach((x) => { parent.appendChild(x); });
