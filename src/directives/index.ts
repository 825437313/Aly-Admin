import { App } from "vue";
import copy from "./modules/cope";

const directivesList: any = {
	copy
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
