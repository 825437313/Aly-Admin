<template>
	<div class="card content-box mian-re">
		<span class="text">可拖拽指令</span>
		<div class="box-content flx-center" v-drag>按着我拖动试一下</div>
	</div>
</template>

<script setup lang="ts" name="drag"></script>

<style scoped lang="scss">
.mian-re {
	position: relative;

	// justify-content: center;
}
.box-content {
	top: calc(50% - 130px);
	left: calc(50% - 130px);
	width: 260px;
	height: 260px;
	font-size: 28px;
	font-weight: bold;
	background-color: aquamarine;
	border-radius: 130px;
}
</style>
