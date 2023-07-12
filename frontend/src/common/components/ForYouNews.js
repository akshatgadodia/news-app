import "../stylesheets/AllNewsPage.css";
import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import jsPDF from "jspdf";

const ForYouNews = (props) => {
  const { loggedInDetails } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
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
          `api/news/get-preferred-news?language=${loggedInDetails.language}`,
          options
        );
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.error);
        }
        // console.log(data);
        setNews(data.news);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert(err.message);
        setLoading(false);
      }
    };
    getData();
  }, [loggedInDetails.language]);

  const onTabChange = (key) => {
    props.handleTabChange(key);
  };

  const generatePdf = async () => {
    const pdf = new jsPDF();
    const titleX = 105; // X position for the title (centered)
    const pageHeight = pdf.internal.pageSize.height;
    let yPos = 20;
    const lineSpacing = 10;
    // const maxContentLength = 350;

    news.forEach((data, idx) => {
      // Add a new page for each news category
      if (idx !== 0) pdf.addPage();
      // Add title
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(titleX, yPos, `${data.name.toUpperCase()} NEWS`, {
        align: "center",
      });
      yPos += lineSpacing * 2;

      if (data.news.length !== 0) {
        data.news.forEach((data, idx) => {
          // Check if yPos exceeds page height
          if (yPos + lineSpacing > pageHeight) {
            pdf.addPage();
            yPos = 20;
          }
          // Add title
          pdf.setFontSize(14);
          pdf.setFont("helvetica", "bold");
          const contentTitle = pdf.splitTextToSize(data.title || "", 180);
          const truncatedTitle =
            contentTitle.length > 6 ? contentTitle.slice(0, 6) : contentTitle;
          truncatedTitle.forEach((line) => {
            pdf.text(20, yPos, line);
            yPos += lineSpacing;
          });
          // Add "Read More" link
          pdf.setTextColor(0, 0, 255);
          pdf.setFont("helvetica", "normal");
          pdf.textWithLink("Read More", 20, yPos, { url: data.url });
          yPos += lineSpacing * 2;
          pdf.setTextColor(0, 0, 0);
        });
      } else {
        // Add title
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(
          titleX,
          yPos,
          `Sorry! Currently, we have no news of this category`,
          {
            align: "center",
          }
        );
        yPos += lineSpacing * 2;
      }
      yPos = 20;
    });

    pdf.save(`News.pdf`);
  };

  return (
    <>
      {!loading && (
        <div className="get-pdf-news-button-div">
          <button onClick={generatePdf} className="get-pdf-news-button">
            Get this page in pdf format
          </button>
        </div>
      )}
      <div className="all-news-page">
        {loading && <h2>Loading...</h2>}
        {news.length !== 0 &&
          !loading &&
          news.map((data, idx) => {
            return (
              <div key={idx} className="all-news-page-div">
                <div className="all-news-page-div-header">
                  <h2>{data.name}</h2>
                  <button onClick={() => onTabChange(data.name)}>
                    View More
                  </button>
                </div>
                <div className="all-news-page-div-body">
                  {data.news.length === 0 && !loading && (
                    <div className="all-news-page-no-news">
                      Sorry! Currently, we have no news of this category
                    </div>
                  )}
                  {data.news.length > 0 && (
                    <div className="all-news-page-container">
                      {data.news.map((data, idx) => (
                        <div className="news-card-all" key={idx}>
                          <h4>{data?.title}</h4>
                          <a href={data?.url} target="_blank" rel="noreferrer">
                            Read More
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ForYouNews;
