<template>
	<el-container>
		<el-aside>
			<Menu></Menu>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
				<TablList></TablList>
			</el-header>
			<el-main>
				<section class="main-box">
					<router-view v-slot="{ Component, route }">
						<transition name="fade" mode="out-in" appear>
							<!-- 强制过度，:key防止复用组件 -->
							<keep-alive>
								<component :is="Component" :key="route.path" />
							</keep-alive>
						</transition>
					</router-view>
				</section>
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
import TablList from "./Tab/index.vue";
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
