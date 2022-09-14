import type { Directive, DirectiveBinding } from "vue";

const watermark: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		addWaterMarker(binding.value.text1, binding.value.text2, el, binding.value.font, binding.value.textColor);
	}
};

const addWaterMarker = (str1: string, str2: string, parentNode: HTMLElement, font: string, textColor: any) => {
	const img = document.createElement("canvas");
	parentNode.appendChild(img);
	img.width = 200;
	img.height = 150;
	img.style.zIndex = "999";
	img.style.display = "none";

	const image = img.getContext("2d") as CanvasRenderingContext2D;
	image.rotate((-25 * Math.PI) / 180); // 逆时针旋转π/9
	image.globalAlpha = 1;
	image.textAlign = "left";
	image.font = font || "18px Microsoft Yauheni "; //字体
	image.fillStyle = textColor || "rgb(200,200,200,1)"; //画笔样式
	image.fillText(str1, 15, 80); // 第一行字体
	image.fillText(str2, 15, 100); // 第二行字体
	parentNode.style.backgroundImage = "url(" + img.toDataURL("image/png") + ")";
};

export default watermark;
