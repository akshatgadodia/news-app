import React, { useState } from "react";
import { Button, Form, Input, Spin, Select } from "antd";
import "./AdminPage.css";
// import Uploady from "@rpldy/uploady"
// import UploadButton from "@rpldy/upload-button"
// import UploadPreview from "@rpldy/upload-preview"

const AdminPage = () => {
  // const loginData = JSON.parse(localStorage.getItem("NW_UserDetails"));
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [category, setCategory] = useState(3);
  const [country, setCountry] = useState("india");
  const [imageUrl, setImageUrl] = useState(null);
  const handleLanguageSelect = (value) => {
    setLanguage(value);
  };
  const handleCategorySelect = (value) => {
    setCategory(value);
  };
  const handleCountrySelect = (value) => {
    setCountry(value);
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const uploadImage = async (file) => {
    // console.log(file);
    // file.headers["Content-Type"] = "image/jpeg";
    const loginData = JSON.parse(localStorage.getItem("NW_UserDetails"));
    const formData = new FormData();
    formData.append("image", file);
    const result = await fetch(`http://localhost:5000/api/image/upload-image`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + loginData.token,
        // "Content-Type": 'multipart/form-data; name="name"'
      },
    });
    const resultData = await result.json();
    // console.log(resultData);
    setImageUrl(resultData.data.url);
    // return {
    //   success: 1,
    //   file: {
    //     url: `${resultData.data.url}`,
    //   },
    // };
  };

  const onFinish = async (values) => {
    setLoading(true);
    const loginData = JSON.parse(localStorage.getItem("NW_UserDetails"));
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          source: values.source,
          title: values.title,
          description: values.description,
          url: values.url,
          content: values.content,
          imageUrl,
          language,
          category,
          country,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + loginData.token,
        },
      };
      const response = await fetch(
        "http://localhost:5000/api/news/add-news",
        options
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      alert("News Added Successfully");
      setCategory(3);
      setCountry("india");
      setImageUrl(null);
      setLanguage("english")
      setLoading(false);
      form.resetFields()
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
        className="admin-page-form"
        layout="vertical"
      >
        <Form.Item
          name="source"
          label="Source"
          rules={[
            {
              required: true,
              message: "Please input news source",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input news title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input news description",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="URL"
          rules={[
            {
              required: true,
              message: "Please input news image url",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Please input news content",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="upload" label="Upload Image">
          {imageUrl && (
            <div>
              <img alt="not found" width={"250px"} src={imageUrl} />
              <br />
              <button onClick={() => setImageUrl(null)}>Remove</button>
            </div>
          )}
          {!imageUrl && (
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                uploadImage(event.target.files[0]);
              }}
            />
          )}
        </Form.Item>
        {/* <Form.Item name="upload1" label="Upload Image">
         <Uploady destination={{url: "http://localhost:5000/api/image/upload-image"}}>
              <UploadButton
                destination={{
                  headers: {
                    Authorization: "Bearer " + loginData.token
                  }
                }}
              >Upload Image</UploadButton>
              <UploadPreview/>
         </Uploady>
        </Form.Item> */}
        <Form.Item name="language" label="Language" initialValue="english">
          <Select onChange={handleLanguageSelect} value={language}>
            <Option value="english">English</Option>
            <Option value="hindi">Hindi</Option>
          </Select>
        </Form.Item>
        <Form.Item name="category" label="Category" initialValue="Business">
          <Select onChange={handleCategorySelect} value={category}>
            <Option value={3}>Business</Option>
            <Option value={4}>Entertainment</Option>
            <Option value={5}>Environment</Option>
            <Option value={6}>Food</Option>
            <Option value={7}>Health</Option>
            <Option value={8}>Politics</Option>
            <Option value={9}>Science</Option>
            <Option value={10}>Sports</Option>
            <Option value={11}>Technology</Option>
            <Option value={12}>Top</Option>
            <Option value={13}>Tourism</Option>
            <Option value={14}>World</Option>
          </Select>
        </Form.Item>
        <Form.Item name="country" label="Country" initialValue="india">
          <Select onChange={handleCountrySelect} value={country}>
            <Option value="india">India</Option>
            <Option value="united states of america">USA</Option>
            <Option value="united kingdom">UK</Option>
            <Option value="australia">Australia</Option>
            <Option value="japan">Japan</Option>
          </Select>
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

export default AdminPage;
