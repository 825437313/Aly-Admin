import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// * 导入所有router
// const metaRouters = import.meta.glob("./modules/*.ts");
// for (const path in metaRouters) {
// 	metaRouters[path]().then((mod) => {
// 		console.log(path, mod)
// 	})
// }
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: { name: "login" }
	},
	{
		name: "login",
		path: "/login",
		meta: {
			title: "登录页",
			requireAuth: false,
			key: "login"
		},
		component: () => import("@/pages/login/index.vue")
	},

	{
		path: "/:pathMatch(.*)",
		redirect: { name: "404" }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
