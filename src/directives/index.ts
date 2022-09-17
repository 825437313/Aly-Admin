import { App } from "vue";
import copy from "./modules/cope";
import watermark from "./modules/watermark";
import drag from "./modules/drag";

const directivesList: any = {
	copy,
	watermark,
	drag
};
// 自定义指令
const directives = {
	install: (app: App) => {
		Object.keys(directivesList).forEach(key => {
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;
