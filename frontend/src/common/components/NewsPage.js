import React, { useState, useEffect, useContext } from "react";
import { Spin, Pagination } from "antd";
import "../stylesheets/NewsPage.css";
import NewsCard from "./NewsCard";
import AppContext from "../../context/AppContext";
import jsPDF from "jspdf";

const NewsPage = (props) => {
  const { loggedInDetails } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQueries, setTotalQueries] = useState(0);
  const pageSize = 10;

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
          `api/news/get-news?category=${props.category}&page=${currentPage}&pageSize=${pageSize}&language=${loggedInDetails.language}`,
          options
        );
        const data = await response.json();
        // console.log(data.total_count[0].total_count);
        if (response.status !== 200) {
          throw new Error(data.error);
        }
        setNews(data.news);
        setTotalQueries(data.total_count[0].total_count);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert(err.message);
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, props.category, loggedInDetails.language]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generatePdf = async () => {
    const pdf = new jsPDF();
    const titleX = 105; // X position for the title (centered)
    const pageHeight = pdf.internal.pageSize.height;
    let yPos = 20;
    const lineSpacing = 10;
    // const maxContentLength = 350;
    // Add title
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text(titleX, yPos, `${props.category.toUpperCase()} NEWS`, {
      align: "center",
    });
    yPos += lineSpacing * 2;

    if (news.length !== 0) {
      news.forEach((data, idx) => {
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

        // Add content
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        const contentLines = pdf.splitTextToSize(data.content || "", 180);
        const truncatedContent =
          contentLines.length > 6 ? contentLines.slice(0, 6) : contentLines;
        truncatedContent.forEach((line) => {
          // Check if yPos exceeds page height
          if (yPos + lineSpacing > pageHeight) {
            pdf.addPage();
            yPos = 20;
          }
          pdf.text(20, yPos, line);
          yPos += lineSpacing;
        });

        // Add "Read More" link
        pdf.setTextColor(0, 0, 255);
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
    const filename = `${props.category
      .charAt(0)
      .toUpperCase()}${props.category.slice(1)} News`;
    pdf.save(`${filename}.pdf`);
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
      {news.length === 0 && !loading && (
        <h2>Sorry! Currently, we have no news of this category</h2>
      )}
      <div className="news-page-div">
        <Spin spinning={loading}>
          {news.length > 0 && (
            <div className="news-page-container">
              {news.map((data, idx) => (
                <NewsCard data={data} key={idx} />
              ))}
            </div>
          )}
          {news.length > 0 && (
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                // total={pageSize * news.length} // Assuming the total number of news articles/
                total={totalQueries}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          )}
        </Spin>
      </div>
    </>
  );
};

export default NewsPage;
