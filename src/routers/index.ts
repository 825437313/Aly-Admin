import router from "@/routers/router";
import NProgress from "@/config/nprogress";
import { GolbState } from "../store/index";
router.beforeEach((to, from, next) => {
	NProgress.start();
	const golb = GolbState();

	//* 已经登录跳转到首页
	if (to.path === "/login" && golb.token) next({ name: "home" });

	// * 不需要登录权限直接放行
	if (!to.matched.some(record => record.meta.requiresAuth)) return next();

	if (!golb.token) {
		next({ name: "login" });
		NProgress.done();
		return;
	} else next();
});
router.afterEach(() => {
	NProgress.done();
});

export default router;
