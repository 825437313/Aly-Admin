import http from "@/api";
import { PORT1 } from "../config/servicePort";
import { Menu } from "../interface";
// * 菜单
export const MenuList = () => {
	return http.get<Menu.ResMenuList[]>(PORT1 + `/menu/list`);
};
