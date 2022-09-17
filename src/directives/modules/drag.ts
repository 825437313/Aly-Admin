// *拖拽指令

import type { Directive } from "vue";

interface ElType extends HTMLElement {
	parentNode: any;
}

const drag: Directive = {
	mounted(el: ElType) {
		el.style.cursor = "move";
		el.style.position = "absolute";
		el.onmousedown = e => {
			const disx = e.pageX - el.offsetLeft;
			const disy = e.pageY - el.offsetTop;

			document.onmousemove = function (e) {
				let x = e.pageX - disx;
				let y = e.pageY - disy;

				let moveW = el.parentNode.offsetWidth - el.offsetWidth;
				let moveH = el.parentNode.offsetHeight - el.offsetHeight;

				if (x < 0) {
					x = 0;
				} else if (x > moveW) {
					x = moveW;
				}
				if (y < 0) {
					y = 0;
				} else if (y > moveH) {
					y = moveH;
				}
				el.style.left = x + "px";
				el.style.top = y + "px";
			};
			document.onmouseup = function () {
				document.onmousemove = document.onmouseup = null;
			};
		};
	}
};

export default drag;
