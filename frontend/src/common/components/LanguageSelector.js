import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/LanguageSelector.css";
import { Select, Space } from "antd";
import AppContext from "../../context/AppContext";

const LanguageSelector = () => {
  const { dispatch } = useContext(AppContext);
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=836311ac7ebdf39b12c7f304e0d6c33f&units=metric`;
      const response = await fetch(url);
      if (response.status === 200) {
        const resJson = await response.json();
        // console.log(resJson);
        setCity(resJson.name);
        setTemperature(resJson.main.temp);
      }
    });
  }, []);

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    dispatch({
      type: "LanguageChange",
      payload: { language: value },
    });
  };

  return (
    <div className="language-selector">
    <div className="temperature-div">
          <p>{city}</p>
          <strong>{temperature} °C</strong>
        </div>
      <Space wrap>
        <Select
          defaultValue="english"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "english",
              label: "English",
            },
            {
              value: "hindi",
              label: "Hindi",
            },
          ]}
        />
      </Space>
    </div>
  );
};

export default LanguageSelector;
