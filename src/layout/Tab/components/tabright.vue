<template>
	<div class="right-tab">
		<Dropdown></Dropdown>
		<el-icon :size="26"><Refresh /></el-icon>
		<el-icon :size="26"><FullScreen /></el-icon>
	</div>
</template>

<script setup lang="ts">
import Dropdown from "./dropdown.vue";
</script>

<style scoped lang="scss">
.right-tab {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 120px;
	height: 40px;
	padding: 2px 0;
	padding-right: 20px;
}
</style>
