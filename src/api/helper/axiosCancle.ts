// 1. 有一个局部分页时，用户快速点击第2页，然后继续点击第3页，如果网络不太稳定时，
// 第2页的请求正在发送中，还未响应，但第3页的请求先响应了，过了一会第2 页请求才响应
// ，这时用户处于第3页，但看到的数据确是第2页的，当然有人会说可以在发送请求过程中禁用掉分页按钮点击，
// 但我感觉体验不太好，为何禁用呢，直接点击第3页时中断掉之前相同的请求即可。

import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";
import { isFunction } from "../../utils/index";
// 请求map 唯一标识和取消函数
let paddingMaps = new Map<string, Canceler>();
// 2. 切换路由时，上一路由页面中仍有未响应的请求时切换了路由，应该把正在pending的所有请求中断取消掉。
// * 取消网络请求，重复请求

// * 序列化参数
export const configToUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class Cancle {
	/**
	 * @description 添加请求
	 * @param config
	 */
	addPadding(config: AxiosRequestConfig) {
		this.deletePadding(config);
		let url = configToUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!paddingMaps.has(url)) {
					paddingMaps.set(url, cancel);
				}
			});
	}
	/**
	 * @description 取消请求
	 * @param config
	 */
	deletePadding(config: AxiosRequestConfig) {
		let url = configToUrl(config);
		if (paddingMaps.has(url)) {
			const cancel = paddingMaps.get(url);
			cancel && cancel();
			paddingMaps.delete(url);
		}
	}
	/**
	 * @description 取消所有请求
	 * @param config
	 */
	removeAllPending() {
		paddingMaps.forEach(cancel => {
			cancel && isFunction(cancel) && cancel();
		});
		paddingMaps.clear();
	}

	/**
	 * @description: 重置
	 */
	reset(): void {
		paddingMaps = new Map<string, Canceler>();
	}
}
