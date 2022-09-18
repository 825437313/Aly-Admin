import { App } from "vue";
import copy from "./modules/cope";
import watermark from "./modules/watermark";
import drag from "./modules/drag";
import debounce from "./modules/debounce";
import thorttle from "./modules/thorttle";

const directivesList: any = {
	copy,
	watermark,
	drag,
	debounce,
	thorttle
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
