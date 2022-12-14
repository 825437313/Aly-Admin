import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const router: Array<RouteRecordRaw> = [
	{
		path: "/directives",
		component: Layout,
		redirect: "/directives/copyDirect",
		meta: {
			title: "自定义指令"
		},
		children: [
			{
				name: "copyDirect",
				path: "/directives/copyDirect",
				component: () => import("@/pages/directives/copyDirect/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "复制指令",
					key: "copyDirect"
				}
			},
			{
				name: "watermarkDirect",
				path: "/directives/watermarkDirect",
				component: () => import("@/pages/directives/watermarkDirect/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "水印指令",
					key: "watermarkDirect"
				}
			},
			{
				name: "drag",
				path: "/directives/dragDirect",
				component: () => import("@/pages/directives/drag/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "拖拽指令",
					key: "drag"
				}
			},
			{
				path: "/directives/debounceDirect",
				name: "debounce",
				component: () => import("@/pages/directives/debounceDirect/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "防抖指令",
					key: "debounceDirect"
				}
			},
			{
				path: "/directives/throttleDirect",
				name: "throttle",
				component: () => import("@/pages/directives/throttle/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "节流指令",
					key: "throttle"
				}
			}
		]
	}
];

export default router;
