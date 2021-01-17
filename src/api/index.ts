// API请求汇总

import '@/mock';
import { curl } from '@/utils/http';
import { UpdateBookmarkRes, DownloadBookmarkRes } from '@/types/home';
import { LoginRes, LogoutRes } from '@/types/login';

// 登录接口
export const login = (email: string, code: string): Promise<LoginRes> => {
  const url = '/login';
  return curl(url, { email, code });
};

// 登出接口
export const logout = (token: string): Promise<LogoutRes> => {
  const url = '/logout';
  return curl(url, { token });
};

// 上传书签数据
export const updateBookmark = (tree: any): Promise<UpdateBookmarkRes> => {
  const url = '/bookmark/update';
  return curl(url, { tree });
};

// 下载书签数据
export const downloadBookmark = (): Promise<DownloadBookmarkRes> => {
  const url = '/bookmark/download';
  return curl(url);
};
