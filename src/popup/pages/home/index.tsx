import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { Button, Toast } from 'antd-mobile';
import chromeUtils from '@/utils/chromeUtils';
import { merge } from '@/utils/treeUtils';
import localStorageUtils from "@/utils/localStorageUtils";
import API from "@/api";
import "./index.less";

const Home: FC = () => {
  const history: History = useHistory();

  const logout = () => {
    localStorageUtils.setToken('');
    history.push("/login");
  };

  const setBookmark = async (cloudBookmark: any[]): Promise<void> => {
    if (!cloudBookmark || cloudBookmark.length === 0) {
      return;
    }
    const localBookmark = await chromeUtils.getTree();
    const recentBookmark = await chromeUtils.getRecent(30);
    const { delList, updateList, createList, createCloudList } = merge(localBookmark, cloudBookmark, recentBookmark);
    for (let i = 0; i < delList.length; i++) {
      await chromeUtils.remove(delList[i]);
    }
    for (let i = 0; i < updateList.length; i++) {
      const { id, title, url } = updateList[i];
      await chromeUtils.update(id, { title, url });
    }
    const createBookmark = (book: any): void => {
      const { children, title = '', url = '', index = 0, parentId } = book;
      const param = { title, index, parentId, url };
      !param.url && delete param['url'];
      chromeUtils.create(param);
      if (children && Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
          if (children[i]) {
            createBookmark(children[i]);
          }
        }
      }
    }
    for (let i = 0; i < createList.length; i++) {
      const item = createList[i];
      item && createBookmark(item);
    }
    // await chromeUtils.cleanBookmark();
    // await chromeUtils.setBookmark(bookmark);
  };

  const bookmarkSynchro = async (): Promise<void> => {
    const downloadBookmarkRes = await API.downloadBookmark();
    console.log('@@@@@ downloadBookmarkRes', downloadBookmarkRes);
    const getTreeRes = await chromeUtils.getTree();
    const getRecentRes = await chromeUtils.getRecent(10);
    // const removeTreeRes = await chromeUtils.removeTree('');
    console.log('##### getTreeRes ', getTreeRes);
    console.log('##### getRecentRes ', getRecentRes);
    // console.log('##### removeTreeRes ', removeTreeRes);
    const { code, data, msg } = downloadBookmarkRes;
    if (code === 0) {
      const { bookmark = '' } = data || {};
      if (bookmark && typeof bookmark === 'string') {
        setBookmark(JSON.parse(bookmark));
      }
    } else {
      Toast.show(msg || '获取书签错误');
    }
  };

  return (
    <div className="home-contaner">
      <div className="account">账号：123456789@qq.com</div>
      <div className="button">
        <Button className="logout-btn" type="primary" size="large" onClick={logout}>
          退出登录
        </Button>
        <Button className="bookmark-btn" type="primary" size="large" onClick={bookmarkSynchro}>
          同步书签
        </Button>
      </div>
    </div>
  );
};

export default Home;
