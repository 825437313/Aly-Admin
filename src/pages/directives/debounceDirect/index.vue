<template>
	<div class="card content-box">
		<span class="text">自定义防抖指令</span>
		<div class="box-content">
			<el-button v-debounce="clickhander" type="primary">点击防抖 1s 后执行</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="debounce">
import { ElMessage } from "element-plus";

const clickhander = () => {
	ElMessage.success("防抖就是频繁操作，最后在最后执行");
};
</script>

<style scoped></style>
