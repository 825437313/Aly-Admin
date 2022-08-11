import { RouteRecordRaw } from "vue-router";

//* 错误页面模板
const router: Array<RouteRecordRaw> = [
	{
		path: "/404",
		name: "404",
		component: () => import("@/pages/error/404.vue"),
		meta: {
			requiresAuth: false,
			title: "404页面",
			key: "404",
			keepAlive: false // 不需要被缓存
		}
	}
];

export default router;
