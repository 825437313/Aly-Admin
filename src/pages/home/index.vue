<template>
	<div class="flx-center home card">
		<div class="home-left">
			<h1>Welcome</h1>
			<img src="@/assets/images/welcome.svg" alt="Welcome" />
		</div>
		<div class="home-right">
			<p class="title1">爱一个人 是那么的痛苦</p>
			<p class="title2">我也想尝尝爱情的心酸 @.@</p>
		</div>
	</div>
</template>

<script setup lang="ts" name="home"></script>
<style scoped lang="scss">
.home {
	width: 100%;
	height: 100%;
	text-align: center;
	.home-left {
		h1 {
			margin-bottom: 20px;
		}

		width: 50%;
		height: 50%;
		img {
			width: 100%;
			height: 100%;
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
