<template>
	<el-container>
		<el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-container>
				<el-header>Header</el-header>
				<el-main>
					<router-view v-slot="{ Component, route }">
						<transition name="fade" mode="out-in" appear>
							<!-- 强制过度，防止复用 -->
							<keep-alive>
								<component :is="Component" :key="route.path" />
							</keep-alive>
						</transition>
					</router-view>
				</el-main>
				<el-footer>Footer</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script setup lang="ts"></script>
<style scoped>
@import "./index.scss";
</style>
