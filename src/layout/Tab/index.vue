<template>
	<div class="tabmenu flx-align-center">
		<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="removeTab">
			<el-tab-pane label="首页" :name="TABS_HOME">
				<template #label>
					<div @contextmenu.stop.prevent>
						<el-icon class="tabs-icon">
							<component :is="'home-filled'"></component>
						</el-icon>
						首页
					</div>
				</template>
			</el-tab-pane>

			<el-tab-pane v-for="item in tabMenuList" :closable="item.closable" :key="item.name" :label="item.title" :name="item.name">
				<template #label>
					<el-dropdown
						trigger="contextmenu"
						:id="item.name"
						ref="dropdownRef"
						@visible-change="dropdownHandleChange($event, item.name)"
					>
						<span :class="tabsMenuValue === item.name ? 'label' : ''">
							<el-icon class="tabs-icon" v-if="item.icons">
								<component :is="item.icons"></component>
							</el-icon>
							{{ item.title }}
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item :disabled="item.name === TABS_HOME" @click="removeTabMenu(item.name, item.name === TABS_HOME)">
									<el-icon><Close /></el-icon>关闭当前标签页
								</el-dropdown-item>
								<el-dropdown-item
									:disabled="!cloneLeftOrRight(item.name, TabCloneEnum.LEFT)"
									@click="removeTabMenu(item.name, !cloneLeftOrRight(item.name, TabCloneEnum.LEFT), TabCloneEnum.LEFT)"
								>
									<el-icon><DArrowLeft /></el-icon>关闭左侧标签页
								</el-dropdown-item>
								<el-dropdown-item
									:disabled="!cloneLeftOrRight(item.name, TabCloneEnum.RIGHT)"
									@click="removeTabMenu(item.name, !cloneLeftOrRight(item.name, TabCloneEnum.RIGHT), TabCloneEnum.RIGHT)"
								>
									<el-icon><DArrowRight /></el-icon>关闭右侧标签页
								</el-dropdown-item>
								<el-dropdown-item
									:disabled="tabMenuList.length < 2"
									@click="removeTabMenu(item.name, tabMenuList.length < 2, TabCloneEnum.OTHER)"
								>
									<el-icon><Operation /></el-icon>关闭其他标签页
								</el-dropdown-item>
								<el-dropdown-item
									divided
									:disabled="tabMenuList.length <= 0"
									@click="removeTabMenu(item.name, tabMenuList.length <= 0, TabCloneEnum.ALL)"
								>
									<el-icon><Minus /></el-icon>关闭全部标签页
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</el-tab-pane>
		</el-tabs>
		<TabRight></TabRight>
	</div>
</template>

<script setup lang="ts" name="tabs">
import { TABS_HOME } from "@/config/constant";
import { MenuStore } from "@/store/modules/menu";
import { TabPanelName, TabsPaneContext } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { TabsStore } from "../../store/modules/tabs";
import { TabCloneEnum } from "@/enums/tabEnum";
import TabRight from "./components/tabright.vue";
const tabstate = TabsStore();
const router = useRouter();
const route = useRoute(); //当前路由地址
const menustate = MenuStore();

//菜单解决重复出现菜单问题
const dropdownRef = ref();
const dropdownHandleChange = (visible: boolean, name: string) => {
	if (!visible) return;
	dropdownRef.value.forEach((item: { id: string; handleClose: () => void }) => {
		if (item.id === name) return;
		item.handleClose();
	});
};

const tabMenuList = computed(() => tabstate.tabMenuList); //标签栏

//显示关闭左、右侧标签项
const cloneLeftOrRight = (name: string, type: string) => {
	const index = tabMenuList.value.findIndex(item => name === item.name);
	return type === TabCloneEnum.LEFT ? index !== 0 : index !== tabMenuList.value.length - 1;
};

//创建一个可写的计算属性 ref
const tabsMenuValue = computed({
	get: () => tabstate.tabsMenuValue,
	set: val => tabstate.setTabsMenuValue(val)
});

const tabClick = (tab: TabsPaneContext) => {
	router.push(tab.props.name as string);
};

//删除回调
const removeTab = (tagname: TabPanelName) => {
	removeTabMenu(tagname as string);
};

//删除标签操作
const removeTabMenu = (name: string, isdisabled?: boolean, type?: TabCloneEnum) => {
	// 当前项不可操作
	if (isdisabled) return;
	tabstate.removeTabMenuListItem(name, type);
};

watch(
	() => route.path,
	() => {
		const arr = menustate.FlatMenuList.filter(item => item.path == route.path);
		let tabItem = {
			title: route.meta.title as string,
			name: route.path,
			icons: arr[0]?.icon,
			closable: true
		};
		tabstate.addTabMenuListItem(tabItem);
	},
	{ immediate: true }
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
