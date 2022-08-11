import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const router: Array<RouteRecordRaw> = [
	{
		path: "/home",
		component: Layout,
		redirect: "/home/index",
		children: [
			{
				name: "home",
				path: "index",
				component: () => import("@/pages/home/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default router;
