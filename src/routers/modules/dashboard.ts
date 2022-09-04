import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const router: Array<RouteRecordRaw> = [
	{
		path: "/dashboard",
		component: Layout,
		redirect: "/dashboard/dataVisualize",
		children: [
			{
				name: "dataVisualize",
				path: "/dashboard/dataVisualize",
				component: () => import("@/pages/dashboard/dataVisualize/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize"
				}
			}
		]
	}
];

export default router;
