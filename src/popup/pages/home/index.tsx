import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { Button, Toast } from 'antd-mobile';
import chromeUtils from '@/utils/chromeUtils';
import localStorageUtils from "@/utils/localStorageUtils";
import API from "@/api";
import "./index.less";

const Home: FC = () => {
  const history: History = useHistory();

  const logout = () => {
    localStorageUtils.setToken('');
    history.push("/login");
  };

  const setBookmark = (bookmark: any): void => {
    bookmark.forEach((item: any) => {
      
    });
  };

  const bookmarkSynchro = async(): Promise<void> => {
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
