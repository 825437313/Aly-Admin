import { defineStore } from "pinia";
export const GolbState = defineStore({
	persist: {
		key: "GolbState",
		//保存的位置
		// storage: window.sessionStorage //localstorage
		storage: localStorage
	},
	id: "GolbState", // id必填，且需要唯一
	// state: 返回对象的函数
	state: () => ({
		// token
		token: ""
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
		}
	}
});
