import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface ElType extends HTMLElement {
	copyData: string | number;
}
const copy: Directive = {
	// 在绑定元素的父组件
	// 及他自己的所有子节点都挂载完成后调用
	mounted(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
		el.addEventListener("click", handleClick);
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
	},
	// 绑定元素的父组件卸载前调用
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", handleClick);
	}
};

function handleClick(this: any) {
	let copyFont = this.copyData.toLocaleString();
	let textFont = null;
	// 仿知乎掘金 复制一两个字则不添加版权信息 超过一定长度的文字 就添加版权信息
	if (copyFont.length > 10) {
		textFont = `
				${copyFont} 
				--------------------------------三八线--------------------------------
				联系方式：QQ825437313
				外貌：10不存1,187cm是吧？控制90kg;富婆DD!!
				来源: 爱会凋零，花会枯萎！ 
				著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`;
	} else {
		textFont = copyFont; // 没超过十个字 则采用被复制的内容。
	}
	navigator.clipboard
		.writeText(textFont)
		.then(() => {
			ElMessage({
				type: "success",
				message: "复制成功"
			});
		})
		.catch(() => {
			ElMessage({
				type: "error",
				message: "复制失败"
			});
		});
}
export default copy;
