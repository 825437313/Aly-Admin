import { ResultEnum } from "@/enums/httpEnum";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { Cancle } from "./helper/axiosCancle";
import { ResultData } from "./interface/index";
import { GolbState } from "@/store/index";
import { showLoading, hideLoading } from "../config/serviceLoading";
import { ElMessage } from "element-plus";
import router from "@/routers/index";

const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
};
const concel = new Cancle();
class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		//实例化
		this.service = axios.create(config);
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const golbstate = GolbState();
				let token = golbstate.token;
				// *{headers: {hideLoading: true} 请求不加载loading效果
				config.headers!.hideLoading || showLoading();
				concel.addPadding(config);
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
		// * 处理返回的数据
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const golbstate = GolbState();
				hideLoading();
				const { data, config } = response;
				// * 在请求结束后，移除本次请求，并关闭请求 loading
				concel.deletePadding(config);
				// * 状态码599代表token失效
				if (data.code === ResultEnum.TOKENOVER) {
					golbstate.setToken("");
					ElMessage.error(data.msg);
					router.replace({
						name: "login"
					});
					return Promise.reject(data);
				}
				// *处理非200成功的请求
				if (data.code && data.code !== ResultEnum.HTTPSUCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				return data;
			},
			async (error: AxiosError) => {
				hideLoading();
				// 请求超时单独判断，因为请求超时没有 response
				if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
				//window.navigator.onLine 断网状态
				if (!window.navigator.onLine) router.replace({ path: "/500" });
				return Promise.reject(error);
			}
		);
	}
	//* 请求方法封装
	get<T>(url: string, params: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

export default new RequestHttp(config);
