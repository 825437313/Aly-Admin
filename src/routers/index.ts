import router from "@/routers/router";
import NProgress from "@/config/nprogress";
import { GolbState } from "../store/index";
import { Cancle } from "@/api/helper/axiosCancle";
const canclePadding = new Cancle();
router.beforeEach((to, from, next) => {
	//* 路由跳转前清除所有网络请求
	canclePadding.removeAllPending();
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
