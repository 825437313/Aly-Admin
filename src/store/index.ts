import { createPinia } from "pinia";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// piniaPersist(ζδΉε)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
