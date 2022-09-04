<template>
	<div class="header">
		<div class="header-left flx-justify-between">
			<Collapse />
			<Breadcrumb />
		</div>
		<div class="header-right"></div>
	</div>
</template>

<script setup lang="ts">
import Collapse from "./components/collapse.vue";
import Breadcrumb from "./components/breadcrumb.vue";
</script>

<style scoped lang="scss">
.header {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 55px;
	padding: 0 20px;
	background-color: #ffffff;
	border-bottom: 1px solid #f6f6f6;
}
</style>
