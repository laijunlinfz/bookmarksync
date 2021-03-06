import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { InputItem, Button, Toast } from "antd-mobile";
import { isEmail } from "@/utils";
import API from "@/api";
import { MSG } from "@/constants";
import localStorageUtils from "@/utils/localStorageUtils";
import { LoginDataRes } from "@/types/login";
import chromeUtils from "@/utils/chromeUtils";
import "./index.less";
import { ChromeEventType } from "@/types/background";

let TIME = 120;
let INTERVAL: NodeJS.Timeout;

// test6
const Login: React.FC = () => {
  const history: History = useHistory();
  const [email, setEmail] = useState<string>("3@qq.com");
  const [code, setCode] = useState<string>("1111");
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    const token = localStorageUtils.getToken();
    if (token) {
      history.push("/home");
    }
  }, [history]);

  const canClickCodeBtn: boolean = useMemo(() => {
    return isEmail(email) && second === 0;
  }, [email, second]);

  const canClickLoginBtn: boolean = useMemo(() => {
    return isEmail(email) && code.length === 4;
  }, [email, code]);

  const codeBtnText: string = useMemo(() => {
    return second === 0 ? '获取验证码' : `${second}s`
  }, [second]);

  const triggerCountDown = (): void => {
    INTERVAL = setInterval(() => {
      setSecond(--TIME);
      if (TIME === 0) {
        TIME = 120;
        clearInterval(INTERVAL);
      }
    }, 1000);
  }

  const getCode = async(): Promise<void> => {
    if (!canClickCodeBtn) {
      return;
    }
    setSecond(TIME);
    triggerCountDown();
    const result = await API.getCode(email);
    const { code: apiCode, data } = result || {}
    if (apiCode === 0) {
      setCode(data);
      Toast.show(MSG.CodeSuccess);
    }
  };

  const loginSucesssOp = async (loginRes: LoginDataRes): Promise<void> => {
    const { token, bookmark: oldBookmark = '' } = loginRes as LoginDataRes || {};
    // TODO update bookmark 不主动刷新
    localStorageUtils.setToken(token);
    localStorageUtils.setEmail(email);
    // 账号初次登录，上传所有书签数据
    if (!oldBookmark) {
      const bookmark = await chromeUtils.getTree();
      API.uploadBookmark(JSON.stringify(bookmark), ChromeEventType.AllTree);
    }
    history.push("/home");
  };

  const login = async(): Promise<void> => {
    if (!canClickLoginBtn) {
      return;
    }
    const loginRes = await API.login(email, code, '');
    const { code: apiCode, msg, data } = loginRes || {};
    if (apiCode === 0) {
      loginSucesssOp(data as LoginDataRes);
    } else {
      Toast.show(msg || '登录异常');
    }
  };

  const onEailChange = (value: string): void => {
    setEmail(value.trim());
  };

  const onCodeChange = (value: string): void => {
    setCode(value.trim());
  };

  return (
    <div className="login-contaner">
      <div className="ipt-con">
        <InputItem
          className="email-input"
          placeholder="请输入邮箱"
          value={email}
          onChange={onEailChange}
        />
      </div>
      <div className="ipt-con">
        <InputItem
          className="code-input"
          placeholder="请输入四位验证码"
          value={code}
          onChange={onCodeChange}
        />
        <button
          className={`code-btn ${canClickCodeBtn ? "blue" : "gray"}`}
          type="button"
          onClick={getCode}
        >
          {codeBtnText}
        </button>
      </div>
      <Button
        className="login-btn"
        type="primary"
        size="large"
        onClick={login}
        disabled={!canClickLoginBtn}
      >
        登录
      </Button>
    </div>
  );
};

export default Login;
