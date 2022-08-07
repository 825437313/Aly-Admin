import router from "@/routers/router";
import NProgress from "@/config/nprogress";

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});
router.afterEach(() => {
	NProgress.done();
});

export default router;
