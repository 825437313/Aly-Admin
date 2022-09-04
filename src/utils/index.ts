/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, "Function");
}

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/**
 *
 * @param arr 需要扁平化数组
 * @description：数组扁平化
 * @returns
 */
export function ArrFlatMap(arr: any) {
	return arr.reduce((pre: any, cur: any) => {
		let _arr = [
			...pre,
			{
				icon: cur.icon,
				path: cur.path,
				title: cur.title
			}
		];
		if (cur.children) _arr = [..._arr, ...ArrFlatMap(cur.children)];
		return _arr;
	}, []);
}
