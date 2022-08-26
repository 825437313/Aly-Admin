<template>
	<el-icon class="icons" @click="menuStore.setCollapse()">
		<component :is="isCollapse ? 'expand' : 'fold'"></component>
	</el-icon>
</template>

<script setup lang="ts">
import { MenuStore } from "@/store/modules/menu";

const menuStore = MenuStore();

const isCollapse = computed((): boolean => menuStore.isCollapse);
</script>

<style scoped lang="scss">
.icons {
	font-size: 24px;
	cursor: pointer;
}
</style>
