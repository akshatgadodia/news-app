import React, { useState, useContext } from "react";
import { Button, Form, Input, Spin } from "antd";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const LoginPage = () => {
  const { dispatch } = useContext(AppContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/user/sign-in", options);
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      dispatch({
        type: "UserLogin",
        payload: { name: data.name, role: data.role },
      });
      localStorage.setItem("NW_UserDetails", JSON.stringify({token: data.jwtToken, name: data.name, role: data.role }));
      alert("Login Successfully");
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading} size="large">
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        className="login-page-form"
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid Email!",
            },
            {
              required: true,
              message: "Please input your email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LoginPage;

