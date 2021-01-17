import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { Button } from 'antd-mobile';
import chromeUtils from '@/utils/chromeUtils';
import "./index.less";

const Home: FC = () => {
  const history: History = useHistory();

  const logout = () => {
    history.push("/login");
  };

  const bookmarkSynchro = async() => {
    const result = await chromeUtils.getTree();
    const result1 = await chromeUtils.getRecent(10);
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
