// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}

// *Tab
declare namespace Tab {
	interface TabOptions {
		title: string;
		name: string;
		icons?: string;
		closable: boolean;
	}
}
