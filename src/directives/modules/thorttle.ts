// * 节流
// 点击立刻执行，在默个时间段后才可以再次执行

import { isFunction } from "@/utils";
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
	_handerClick: () => any;
	disabled: boolean; //节流阀
}

const thorttle: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		const f = isFunction(binding.value);
		if (!f) throw new Error("not a function");
		let timer: NodeJS.Timeout | null = null;
		el._handerClick = () => {
			if (timer) {
				clearTimeout(timer);
			}
			if (!el.disabled) {
				el.disabled = true;
				binding.value();
				timer = setTimeout(() => {
					el.disabled = false;
				}, 1000);
			}
		};
		el.addEventListener("click", el._handerClick);
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el._handerClick);
	}
};

export default thorttle;
