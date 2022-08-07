import { createPinia } from "pinia";
import { defineStore } from "pinia";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export const GolbState = defineStore({
	persist: {
		key: "GolbState",
		//保存的位置
		storage: window.sessionStorage //localstorage
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

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
