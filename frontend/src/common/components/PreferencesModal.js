import { Spin, Modal, Checkbox } from "antd";
import { useState, useEffect } from "react";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [userCategories, setUserCategories] = useState([]);
  const categories = [
    "business",
    "entertainment",
    "environment",
    "food",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "tourism",
    "world",
  ];
  const handleOk = () => {
    updatePreferences();
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const loginData = JSON.parse(localStorage.getItem("NW_UserDetails"));
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + loginData.token,
          },
        };
        const response = await fetch(
          "/api/user-preferences//get-user-preference",
          options
        );
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.error);
        }
        setUserCategories(data.categories);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCheckboxes = (value) => {
    const updatedCategories = [...userCategories];
    if (updatedCategories.includes(value)) {
      const index = updatedCategories.indexOf(value);
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(value);
    }
    setUserCategories(updatedCategories);
  };

  const updatePreferences = async (values) => {
    setLoading(true);
    try {
      const loginData = JSON.parse(localStorage.getItem("NW_UserDetails"));
      const options = {
        method: "PUT",
        body: JSON.stringify({
          categories: userCategories,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + loginData.token,
        },
      };
      const response = await fetch(
        "/api/user-preferences/add-preference",
        options
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      alert("{Preferences Updated Successfully");
      props.setIsModalOpen(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
      setLoading(false);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="Basic Modal"
      open={props.isModalOpen}
      onOk={handleOk}
      okText="Update Preferences"
      onCancel={handleCancel}
    >
      <Spin spinning={loading}>
        {categories.map((data, idx) => {
          return (
            <Checkbox
              checked={userCategories.includes(data)}
              onChange={() => handleCheckboxes(data)}
              key={idx}
            >
              {data}
            </Checkbox>
          );
        })}
      </Spin>
    </Modal>
  );
};
export default App;
