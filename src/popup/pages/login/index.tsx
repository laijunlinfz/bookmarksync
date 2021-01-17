import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { InputItem, Button, Toast } from "antd-mobile";
import { isEmail } from "@/utils";
import API from "@/api";
import "./index.less";
import { MSG } from "@/constants";

let TIME = 120;
let INTERVAL: NodeJS.Timeout;

const Login: React.FC = () => {
  const history: History = useHistory();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [second, setSecond] = useState<number>(0);

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

  const login = (): void => {
    if (!canClickLoginBtn) {
      return;
    }
    history.push("/home");
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
