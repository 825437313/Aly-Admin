import http from "@/api";
import { Login } from "@/api/interface/index";
import { PORT1 } from "../config/servicePort";
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + "/login", params);
};
