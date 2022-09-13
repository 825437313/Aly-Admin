<template>
	<div class="card content-box">
		<span class="text">超过10个字符，赠送未来男朋友信息等~</span>
		<div class="box-content">
			<el-input placeholder="请输入内容" v-model="copeData" style="width: 500px">
				<template #append>
					<el-button v-copy="copeData">复制</el-button>
				</template>
			</el-input>
		</div>
	</div>
</template>

<script setup lang="ts" name="cope">
const copeData = ref<string>("我是被复制的内容 🍒 🍉 🍊");
</script>

<style scoped></style>
