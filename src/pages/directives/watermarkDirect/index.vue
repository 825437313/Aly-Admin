<template>
	<div class="card content-box watermark" v-watermark="{ text1: '帅气水印one', text2: '第二行', textColor: 'rgba(0,0,0,.15)' }">
		<span class="text">水印指令 通过canvas来实现</span>
	</div>
</template>

<script setup lang="ts" name="watermark"></script>

<style scoped lang="scss">
.watermark {
	height: 100%;
}
</style>
