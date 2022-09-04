<template>
	<div class="main" :style="{ width: isCollapse ? '65px' : '220px' }">
		<Logo :showName="!isCollapse"></Logo>
		<div
			v-loading="menuLoading"
			element-loading-text="Loading..."
			:element-loading-spinner="svg"
			element-loading-svg-view-box="-10, -10, 50, 50"
			element-loading-background="rgba(122, 122, 122, 0.01)"
		>
			<el-scrollbar>
				<el-menu
					:unique-opened="true"
					background-color="#001529"
					text-color="#bdbdc0"
					active-text-color="#fff"
					:router="true"
					:collapse="isCollapse"
					:collapse-transition="false"
					:default-active="activeMenu"
				>
					<MunuItem :menuList="menuList"></MunuItem>
				</el-menu>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { MenuList } from "@/api/modules/menu";
import Logo from "./components/Logo/index.vue";
import MunuItem from "./components/MunuItem/index.vue";
import { MenuStore } from "../../store/modules/menu";
import { useRoute } from "vue-router";
import { ArrFlatMap } from "../../utils/index";

const menuLoading = ref(false);
const menuStore = MenuStore();
const route = useRoute();

const svg = `
<path class="path" d="
	M 30 15
	L 28 17
	M 25.61 25.61
	A 15 15, 0, 0, 1, 15 30
	A 15 15, 0, 1, 1, 27.99 7.5
	L 15 15
" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;
onMounted(async () => {
	menuLoading.value = true;
	try {
		const res = await MenuList();
		if (!res.data) return;
		menuStore.setFlatMenuList(ArrFlatMap(res.data));
		menuStore.setMenuList(res.data);
	} finally {
		menuLoading.value = false;
	}
});

const activeMenu = computed((): string => route.path);
const menuList = computed((): Menu.MenuOptions[] => menuStore.MenuList);
const isCollapse = computed((): boolean => menuStore.isCollapse);
</script>

<style scoped lang="scss">
.main {
	width: 100%;
	height: 100%;
	background-color: #001529;
	transition: all 0.3s ease;
	.el-scrollbar {
		height: calc(100% - 60px);
		.el-menu {
			overflow: auto;
			overflow-x: hidden;
			border-right: none;

			// // firefox隐藏滚动条
			// scrollbar-width: none;

			// overscroll-behavior: contain;
			// //滚动条事件

			// // chrome隐藏滚动条
			// &::-webkit-scrollbar {
			// 	display: none;
			// }
		}
	}
}
</style>
