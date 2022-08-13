import { ElLoading } from "element-plus";

/* element plus全局请求 loading(服务方式调用) */
let loadingInstance: ReturnType<typeof ElLoading.service>;
let requestCount = 0;
const _openLoading = () => {
	loadingInstance = ElLoading.service({
		fullscreen: true,
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)"
	});
};
const _closeLoading = () => {
	loadingInstance.close();
};

//* 记录请求次数
export const showLoading = () => {
	if (requestCount === 0) {
		_openLoading();
	}
	requestCount++;
};

// *关闭完时隐藏
export const hideLoading = () => {
	// *无需关闭
	if (requestCount <= 0) return;
	requestCount--;
	if (requestCount === 0) {
		_closeLoading();
	}
};
