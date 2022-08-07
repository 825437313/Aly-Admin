import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		//设置别名
		alias: {
			"@": pathSrc
		}
	},
	// global css
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/styles/var.scss";`
			}
		}
	},
	plugins: [
		vue(),
		// * demand import element(如果使用了cdn引入,没必要使用element自动导入了)
		AutoImport({
			// Auto import functions from Vue, e.g. ref, reactive, toRef...
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ["vue"],

			// Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
			// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			resolvers: [
				ElementPlusResolver(),

				// Auto import icon components
				// 自动导入图标组件
				IconsResolver({
					prefix: "Icon"
				})
			],

			dts: path.resolve(pathSrc, "auto-imports.d.ts")
		}),

		Components({
			resolvers: [
				// Auto register icon components
				// 自动注册图标组件
				IconsResolver({
					enabledCollections: ["ep"]
				}),
				// Auto register Element Plus components
				// 自动导入 Element Plus 组件
				ElementPlusResolver()
			],

			dts: path.resolve(pathSrc, "components.d.ts")
		}),

		Icons({
			autoInstall: true
		})
	],
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
