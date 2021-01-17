import { BaseRes } from "./index";

interface LoginDataRes {
  email: string;
  token: string;
}

export interface LoginRes extends BaseRes {
  data: LoginDataRes;
}

export type LogoutRes = BaseRes;

export type CodeRes = BaseRes;

