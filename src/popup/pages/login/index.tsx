import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { History } from "history";
import { Toast, InputItem, Button } from "antd-mobile";
import { isEmail } from "@/utils";
import "./index.less";

const Login: React.FC = () => {
  const history: History = useHistory();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const valid = (): boolean => {
    if (!isEmail(email)) {
      Toast.show("请输入有效的邮箱");
      return false;
    }
    if (code.length !== 4) {
      Toast.show("请输入四位数字验证码");
      return false;
    }
    return true;
  };

  const login = (): void => {
    history.push("/home");
    // if (!valid()) {
    //   return;
    // }
    // apiReqs.signIn({
    //   // TODO TYPE
    //   success: (res: any): void => {
    //     console.log(res);
    //     // alert(res.data.nickname)
    //     history.push("/home");
    //   },
    //   // TODO TYPE
    //   fail: (res: any): void => {
    //     alert(res);
    //   },
    // });
  };

  const onEailChange = (value: string): void => {
    // const { value = "" } = e.target;
    setEmail(value.trim());
  };

  const onCodeChange = (value: string): void => {
    // const { value = "" } = e.target;
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
          placeholder="请输入验证码"
          value={code}
          onChange={onCodeChange}
        />
      </div>
      <Button className="login-btn" type="primary" size="large" onClick={login}>
        登录
      </Button>
    </div>
  );
};

export default Login;
