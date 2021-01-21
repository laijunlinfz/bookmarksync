// API请求汇总

import "@/mock";
import { curl } from "@/utils/http";
import { UpdateBookmarkRes, DownloadBookmarkRes } from "@/types/home";
import { LoginRes, CodeRes } from "@/types/login";

// 登获取验证码
export const getCode = (email: string): Promise<CodeRes> => {
  const url = "/code";
  return curl(url, { email });
};

// 登录接口
export const login = (email: string, code: string, token: string): Promise<LoginRes> => {
  const url = "/chrome/login";
  return curl(url, { email, code, token });
};

// 上传书签数据
export const uploadBookmark = (tree: any): Promise<UpdateBookmarkRes> => {
  const url = "/chrome/bookmark/upload";
  return curl(url, { tree });
};

// 下载书签数据
export const downloadBookmark = (): Promise<DownloadBookmarkRes> => {
  const url = "/chrome/bookmark/download";
  return curl(url);
};

export default {
  getCode,
  login,
  uploadBookmark,
  downloadBookmark,
};
