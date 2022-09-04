import { TABS_HOME } from "@/config/constant";
import { defineStore } from "pinia";
import { TabsState } from "../interface/index";
import { TAB_MENULIST_BLACK } from "../../config/constant";
import router from "@/routers";
export const TabsStore = defineStore({
	id: "TabsState", // id必填，且需要唯一
	persist: {
		key: "TabsState",
		storage: localStorage
	},
	// state: 返回对象的函数
	state: (): TabsState => ({
		tabsMenuValue: TABS_HOME, //当前页签高亮
		tabMenuList: [
			{
				title: "首页",
				name: TABS_HOME,
				icons: "home-filled",
				closable: false
			}
		]
	}),
	actions: {
		// * 设置tab激活标签
		async setTabsMenuValue(tabsMenuValue: string) {
			this.tabsMenuValue = tabsMenuValue;
		},
		//* 新增标签项
		async addTabMenuListItem(tabItem: Tab.TabOptions) {
			// * 标签黑名单
			if (TAB_MENULIST_BLACK.includes(tabItem.name)) return;
			// *新增的item不存在
			if (this.tabMenuList.every(item => item.name !== tabItem.name)) {
				this.tabMenuList.push(tabItem);
			}
			this.setTabsMenuValue(tabItem.name);
		},
		//* 删除标签项
		async removeTabMenuListItem(pathName: string) {
			// 点击当前标签才路由跳转
			if (pathName === this.tabsMenuValue) {
				this.tabMenuList.forEach((item, i) => {
					if (item.name !== pathName) return;
					let hasName = this.tabMenuList[i + 1]?.name || this.tabMenuList[i - 1]?.name;
					hasName && router.push(hasName);
				});
			}
			this.tabMenuList = this.tabMenuList.filter(item => item.name !== pathName);
		}
	}
});
