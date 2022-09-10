import { TABS_HOME } from "@/config/constant";
import { defineStore } from "pinia";
import { TabsState } from "../interface/index";
import { TAB_MENULIST_BLACK } from "../../config/constant";
import router from "@/routers";
import { TabCloneEnum } from "@/enums/tabEnum";
export const TabsStore = defineStore({
	id: "TabsState", // id必填，且需要唯一
	persist: {
		key: "TabsState",
		storage: window.sessionStorage // localStorage
	},
	// state: 返回对象的函数
	state: (): TabsState => ({
		tabsMenuValue: TABS_HOME, //当前页签高亮
		tabMenuList: [
			// {
			// 	title: "首页",
			// 	name: TABS_HOME,
			// 	icons: "home-filled",
			// 	closable: false
			// }
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
			if (this.tabMenuList.every(item => item.name !== tabItem.name) && tabItem.name !== TABS_HOME) {
				this.tabMenuList.push(tabItem);
			}
			this.setTabsMenuValue(tabItem.name);
		},
		//* 删除标签项
		async removeTabMenuListItem(pathName: string, type?: TabCloneEnum) {
			const index = this.tabMenuList.findIndex(item => item.name === pathName); //右键菜单所在标签页index
			const currentIndex = this.tabMenuList.findIndex(item => item.name === this.tabsMenuValue); //查找当前激活标签页index
			switch (type) {
				case TabCloneEnum.ALL: //关闭全部标签
					this.tabMenuList = [];
					router.push(TABS_HOME);
					break;
				case TabCloneEnum.LEFT: //关闭左侧标签
					console.log(this.tabMenuList.splice(0, index));

					this.tabMenuList = this.tabMenuList.splice(0, index);
					if (currentIndex < index) {
						router.push(pathName);
					}
					break;
				case TabCloneEnum.RIGHT: //关闭右侧标签
					this.tabMenuList.splice(index + 1);
					if (index < currentIndex) {
						this.setTabsMenuValue(pathName);
					}
					break;
				case TabCloneEnum.OTHER: //关闭其他标签
					this.tabMenuList = [this.tabMenuList[index]];
					if (index !== currentIndex) {
						this.setTabsMenuValue(pathName);
						router.push(pathName);
					}
					break;
				default: //关闭当前标签页
					// 点击当前标签才路由跳转
					if (pathName === this.tabsMenuValue) {
						this.tabMenuList.forEach((item, i) => {
							if (item.name !== pathName) return;
							let hasName = this.tabMenuList[i + 1]?.name || this.tabMenuList[i - 1]?.name;
							if (hasName) {
								router.push(hasName);
							} else {
								router.push(TABS_HOME);
							}
						});
					}
					this.tabMenuList = this.tabMenuList.filter(item => item.name !== pathName);
					break;
			}
		}
	}
});
