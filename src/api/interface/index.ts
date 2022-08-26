// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
}

// * 菜单
export namespace Menu {
	export interface ResMenuList {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: ResMenuList[];
	}
}
