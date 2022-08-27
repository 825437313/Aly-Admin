<template>
	<el-container>
		<el-aside>
			<Menu></Menu>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
			<el-main>
				<router-view v-slot="{ Component, route }">
					<transition name="fade" mode="out-in" appear>
						<!-- 强制过度，:key防止复用组件 -->
						<keep-alive>
							<component :is="Component" :key="route.path" />
						</keep-alive>
					</transition>
				</router-view>
			</el-main>
			<el-footer>
				<Footer></Footer>
			</el-footer>
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import Menu from "./Menu/index.vue";
import Header from "./Header/index.vue";
import Footer from "./Footer/index.vue";
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
