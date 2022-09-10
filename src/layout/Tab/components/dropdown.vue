<template>
	<el-dropdown trigger="click">
		<span class="el-dropdown-link">
			<el-icon :size="26"><ArrowDownBold /></el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :disabled="tabsValue === TABS_HOME" @click="removeTabMenu(tabsValue, tabsValue === TABS_HOME)">
					<el-icon><Close /></el-icon>关闭当前标签页
				</el-dropdown-item>
				<el-dropdown-item
					:disabled="!cloneLeftOrRight(tabsValue, TabCloneEnum.LEFT)"
					@click="removeTabMenu(tabsValue, !cloneLeftOrRight(tabsValue, TabCloneEnum.LEFT), TabCloneEnum.LEFT)"
				>
					<el-icon><DArrowLeft /></el-icon>关闭左侧标签页
				</el-dropdown-item>
				<el-dropdown-item
					:disabled="!cloneLeftOrRight(tabsValue, TabCloneEnum.RIGHT)"
					@click="removeTabMenu(tabsValue, !cloneLeftOrRight(tabsValue, TabCloneEnum.RIGHT), TabCloneEnum.RIGHT)"
				>
					<el-icon><DArrowRight /></el-icon>关闭右侧标签页
				</el-dropdown-item>
				<el-dropdown-item
					v-if="tabsValue == TABS_HOME"
					:disabled="tabMenuList.length === 0"
					@click="removeTabMenu(tabsValue, tabMenuList.length === 0, TabCloneEnum.ALL)"
				>
					<el-icon><Operation /></el-icon>关闭其他标签页
				</el-dropdown-item>
				<el-dropdown-item
					v-else
					:disabled="tabMenuList.length < 2"
					@click="removeTabMenu(tabsValue, tabMenuList.length < 2, TabCloneEnum.OTHER)"
				>
					<el-icon><Operation /></el-icon>关闭其他标签页
				</el-dropdown-item>

				<el-dropdown-item
					divided
					:disabled="tabMenuList.length <= 0"
					@click="removeTabMenu(tabsValue, tabMenuList.length <= 0, TabCloneEnum.ALL)"
				>
					<el-icon><Minus /></el-icon>关闭全部标签页
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { TABS_HOME } from "@/config/constant";
import { TabCloneEnum } from "@/enums/tabEnum";
import { TabsStore } from "../../../store/modules/tabs";
const tabstate = TabsStore();
const tabsValue = computed(() => tabstate.tabsMenuValue); //当前激活页面
const tabMenuList = computed(() => tabstate.tabMenuList); //当前tab列表

//显示关闭左、右侧标签项
const cloneLeftOrRight = (name: string, type: string) => {
	const index = tabMenuList.value.findIndex(item => name === item.name);
	return type === TabCloneEnum.LEFT
		? index !== 0 && name !== TABS_HOME
		: index !== tabMenuList.value.length - 1 && name !== TABS_HOME;
};

//删除标签操作
const removeTabMenu = (name: string, isdisabled?: boolean, type?: TabCloneEnum) => {
	// 当前项不可操作
	if (isdisabled) return;
	tabstate.removeTabMenuListItem(name, type);
};
</script>

<style scoped lang="scss">
.example-showcase .el-dropdown-link {
	display: flex;
	align-items: center;
	cursor: pointer;
}
</style>
