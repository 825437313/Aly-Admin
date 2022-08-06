import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		//设置别名
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	plugins: [vue()],
	server: {
		host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
		port: 8080,
		open: true,
		cors: true,
		// https: false,
		// 代理跨域（mock 不需要配置，这里只是个事列）
		proxy: {
			"/api": {
				// target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
				target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // easymock
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "")
			}
		}
	}
});
