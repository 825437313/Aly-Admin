<template>
	<div class="container">
		<img src="@/assets/images/logo.svg" alt="logo" />
		<span v-show="showName">Toaly Admin</span>
	</div>
</template>

<script setup lang="ts">
defineProps({
	showName: {
		type: Boolean,
		default: true
	}
});
</script>

<style scoped lang="scss">
.container {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	border-bottom: 1px solid #282a35;
	box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
	img {
		// width: 50px;
		width: 30px;
		height: 60px;
		margin-right: 8px;
		object-fit: contain;
	}
	span {
		font-size: 22px;
		font-weight: bold;
		color: #dadada;
		white-space: nowrap;
	}
}
</style>
