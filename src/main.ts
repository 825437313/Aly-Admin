import { createApp } from "vue";
// reset style sheet
import "@/styles/reset.scss";
// pinia store
// element css
import "element-plus/dist/index.css";
// CSS common style sheet
import "@/styles/common.scss";
// CSS custom element styles
import "@/styles/element.scss";
import pinia from "@/store/index";
import router from "@/routers/index";
// custom directives 自定义指令
import directives from "@/directives/index";
import App from "./App.vue";

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.use(router).use(pinia).use(directives).mount("#app");
