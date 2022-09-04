import { defineStore } from "pinia";

export const MenuStore = defineStore({
	persist: {
		key: "MenuState",
		storage: localStorage
	},
	id: "MenuState", // id必填，且需要唯一
	// state: 返回对象的函数
	state: () => ({
		MenuList: [] as Menu.MenuOptions[], //菜单
		FlatMenuList: [] as Menu.MenuOptions[], //扁平化菜单
		isCollapse: false //折叠栏
	}),
	getters: {},
	actions: {
		async setMenuList(MenuLists: Menu.MenuOptions[]) {
			this.MenuList = MenuLists;
		},
		async setFlatMenuList(FlatMenuList: Menu.MenuOptions[]) {
			this.FlatMenuList = FlatMenuList;
		},
		setCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
});
