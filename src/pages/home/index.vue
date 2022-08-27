<template>
	<div class="flx-center home">
		<div class="home-left">
			<h1>Welcome</h1>
			<img src="@/assets/images/welcome.svg" alt="Welcome" />
		</div>
		<div class="home-right">
			<p class="title1">爱一个人 是那么的痛苦</p>
			<p class="title2">我也想谈个恋爱 @.@</p>
		</div>
	</div>
</template>

<script setup lang="ts" name="home"></script>
<style scoped lang="scss">
.home {
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: #ffffff;
	.home-left {
		h1 {
			margin-bottom: 20px;
		}
	}
	.home-right {
		margin-left: 50px;
		font-size: 18px;
		.title1 {
			padding-bottom: 20px;
			font-size: 24px;
		}
	}
}
</style>
