import { BaseRes } from ".";

interface DataRes {
  email: string;
  token: string;
}

export interface LoginRes extends BaseRes {
  data: DataRes;
}

export type LogoutRes = BaseRes;

