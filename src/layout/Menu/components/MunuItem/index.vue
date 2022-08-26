<template>
	<template v-for="item in menuList" :key="item.path">
		<el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
			<template #title>
				<el-icon>
					<component :is="item.icon"></component>
				</el-icon>
				<span>{{ item.title }}</span>
			</template>
			<Index :menuList="item.children" />
		</el-sub-menu>
		<el-menu-item :index="item.path" v-else>
			<el-icon>
				<component :is="item.icon"></component>
			</el-icon>
			<template v-if="!item.isLink" #title>
				<span>{{ item.title }}</span>
			</template>
			<template v-else #title>
				<a class="menu-href" :href="item.isLink" target="_blank">{{ item.title }}</a>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
defineProps<{ menuList: Menu.MenuOptions[] }>();
</script>

<style scoped></style>
