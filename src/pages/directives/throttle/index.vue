<template>
	<div class="card content-box">
		<span class="text">自定义节流指令</span>
		<div class="box-content">
			<el-button v-thorttle="clickhander" type="primary">点击 1s 内只执行一次</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="thorttle">
import { ElMessage } from "element-plus";

const clickhander = () => {
	ElMessage.success("节流执行的函数~");
};
</script>

<style scoped></style>
