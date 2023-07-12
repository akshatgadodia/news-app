import React from "react";
import "../stylesheets/NewsCard.css";

const NewsCard = (props) => {
  return (
    <div className="news-card">
      <img
        src={
          props?.data?.imageURL !== "null"
            ? props?.data?.imageURL
            : "/images/news.jpg"
        }
        alt="news"
        className="news-card-image"
      />
      <div className="news-card-container">
        <h4>{props?.data?.title}</h4>
        <p>
          Country: <strong>{props.data?.country}</strong>
        </p>
        <p>{`${props?.data?.content?.substring(0, 400)}...`}</p>
        <a href={props?.data?.url} target="_blank" rel="noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
