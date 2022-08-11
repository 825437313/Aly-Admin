import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// * 导入所有router
const metaRouters: any = import.meta.glob("./modules/*.ts", { eager: true });

// * 路由表
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

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
	...routerArray,
	{
		path: "/:pathMatch(.*)",
		redirect: { name: "404" }
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
