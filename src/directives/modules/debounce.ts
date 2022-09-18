// * 防抖 操作停下来后才执行

import type { Directive, DirectiveBinding } from "vue";
import { isFunction } from "../../utils/index";

interface ElType extends HTMLElement {
	_handerClick: () => void;
}
const debounce: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		const f = isFunction(binding.value);
		if (!f) throw new Error("debounce is not a function");

		let timer: NodeJS.Timer | null = null;
		el._handerClick = () => {
			if (timer) {
				clearInterval(timer);
			}
			timer = setTimeout(() => {
				binding.value();
			}, 1000);
		};
		el.addEventListener("click", el._handerClick);
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el._handerClick);
	}
};

export default debounce;
