import { createApp } from "vue";
// reset style sheet
import "@/styles/reset.scss";
// pinia store
import pinia from "@/store/index";
import router from "@/routers/index";
import App from "./App.vue";
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
