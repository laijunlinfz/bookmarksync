// API请求汇总

import "@/mock";
import { curl } from "@/utils/http";
import { UpdateBookmarkRes, DownloadBookmarkRes } from "@/types/home";
import { LoginRes, LogoutRes, CodeRes } from "@/types/login";

// 登获取验证码
export const getCode = (email: string): Promise<CodeRes> => {
  const url = "/code";
  return curl(url, { email });
};

// 登录接口
export const login = (email: string, code: string): Promise<LoginRes> => {
  const url = "/login";
  return curl(url, { email, code });
};

// 登出接口
export const logout = (token: string): Promise<LogoutRes> => {
  const url = "/logout";
  return curl(url, { token });
};

// 上传书签数据
export const uploadBookmark = (tree: any): Promise<UpdateBookmarkRes> => {
  const url = "/bookmark/upload";
  return curl(url, { tree });
};

// 下载书签数据
export const downloadBookmark = (): Promise<DownloadBookmarkRes> => {
  const url = "/bookmark/download";
  return curl(url);
};

export default {
  getCode,
  login,
  logout,
  updateBookmark: uploadBookmark,
  downloadBookmark,
};
