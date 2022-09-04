<template>
	<div class="tabmenu">
		<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="removeTab">
			<el-tab-pane v-for="item in tabMenuList" :closable="item.closable" :key="item.name" :label="item.title" :name="item.name">
				<template #label>
					<el-icon class="tabs-icon" v-if="item.icons">
						<component :is="item.icons"></component>
					</el-icon>
					{{ item.title }}
				</template>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts" name="tabs">
import { MenuStore } from "@/store/modules/menu";
import { TabPanelName, TabsPaneContext } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { TabsStore } from "../../store/modules/tabs";
const tabstate = TabsStore();
const router = useRouter();
const route = useRoute(); //当前路由地址
const menustate = MenuStore();

const tabMenuList = computed(() => tabstate.tabMenuList);

//创建一个可写的计算属性 ref
const tabsMenuValue = computed({
	get: () => tabstate.tabsMenuValue,
	set: val => tabstate.setTabsMenuValue(val)
});

const tabClick = (tab: TabsPaneContext) => {
	router.push(tab.props.name as string);
};

const removeTab = (tagname: TabPanelName) => {
	tabstate.removeTabMenuListItem(tagname as string);
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
