import React, { useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import "./RegistrationPage.css";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/user/sign-up", options);
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      alert("Registered Successfully");
      setLoading(false);
      navigate("/sign-in");
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
      className="registration-page-form"
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your name",
          },
        ]}
      >
        <Input />
      </Form.Item>
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
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your Phone Number",
          },
        ]}
      >
        <Input />
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

export default RegistrationPage;
