<script setup lang="ts">
import { useMouse } from "@vueuse/core";
const { x, y } = useMouse();
console.log("x,y :>> ", x.value, y.value);
</script>

<template>
	<h1>测试 vueUse 的鼠标坐标</h1>
	<h3>Mouse: {{ x }} x {{ y }}</h3>
</template>

<style scoped></style>
