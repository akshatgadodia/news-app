import React, { useState } from "react";
import "./HomePage.css";
import { Tabs } from "antd";
import NewsPage from "../../common/components/NewsPage";
import SearchNews from "../../common/components/SearchNews";
import AllNewsPage from "../../common/components/AllNewsPage";
import ForYouNews from "../../common/components/ForYouNews";

const HomePage = () => {
  const { TabPane } = Tabs;
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="home-page">
      <Tabs activeKey={activeTab} centered onChange={handleTabChange}>
        <TabPane tab="Home" key="home">
          <AllNewsPage handleTabChange={handleTabChange}/>
        </TabPane>
        <TabPane tab="For You" key="for-you">
          <ForYouNews handleTabChange={handleTabChange}/>
        </TabPane>
        <TabPane tab="Business" key="business">
          <NewsPage category="business" />
        </TabPane>
        <TabPane tab="Entertainment" key="entertainment">
          <NewsPage category="entertainment" />
        </TabPane>
        <TabPane tab="Environment" key="environment">
          <NewsPage category="environment" />
        </TabPane>
        <TabPane tab="Food" key="food">
          <NewsPage category="food" />
        </TabPane>
        <TabPane tab="Health" key="health">
          <NewsPage category="health" />
        </TabPane>
        <TabPane tab="Politics" key="politics">
          <NewsPage category="politics" />
        </TabPane>
        <TabPane tab="Science" key="science">
          <NewsPage category="science" />
        </TabPane>
        <TabPane tab="Sports" key="sports">
          <NewsPage category="sports" />
        </TabPane>
        <TabPane tab="Technology" key="technology">
          <NewsPage category="technology" />
        </TabPane>
        <TabPane tab="Top" key="top">
          <NewsPage category="top" />
        </TabPane>
        <TabPane tab="Tourism" key="tourism">
          <NewsPage category="tourism" />
        </TabPane>
        <TabPane tab="World" key="world">
          <NewsPage category="world" />
        </TabPane>
        <TabPane tab="Search News" key="15">
          <SearchNews/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HomePage;
