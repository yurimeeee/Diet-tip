import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const Chart = ({ clickedData, setIsModalOpen }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(clickedData, "chart clickedData");
  const [chartFood, setFoodName] = useState(clickedData);
  const [chartData, setChartData] = useState({
    labels: [
      "단백질(g)",
      "지방(g)",
      "탄수화물(g)",
      "당(g)",
      "칼슘(㎎)",
      "칼륨(㎎)",
      "나트륨(㎎)",
      "콜레스테롤(㎎)",
      "트랜스 지방(g)",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "#FFEBEC",
          "#FEC5BA",
          "#F8DCC4",
          "#CADBBB",
          "#FFFBA5",
          "#A6C6DD",
          "#AAC4BB",
          "#CCA3C1",
          "#BDC3C7",
        ],
        hoverBackgroundColor: [
          "#FFEBEC",
          "#FEC5BA",
          "#F8DCC4",
          "#CADBBB",
          "#FFFBA5",
          "#A6C6DD",
          "#AAC4BB",
          "#CCA3C1",
          "#BDC3C7",
        ],
      },
    ],
  });

  useEffect(() => {
    if (clickedData) {
      setChartData({
        labels: [
          "단백질(g)",
          "지방(g)",
          "탄수화물(g)",
          "당(g)",
          "칼슘(㎎)",
          "칼륨(㎎)",
          "나트륨(㎎)",
          "콜레스테롤(㎎)",
          "트랜스 지방(g)",
        ],
        datasets: [
          {
            data: [
              clickedData.PROTEIN || 0,
              clickedData.FAT || 0,
              clickedData.CARBOHYDRATE || 0,
              clickedData.SUGAR || 0,
              clickedData.CALCIUM / 1000 || 0,
              clickedData.POTASSIUM / 1000 || 0,
              clickedData.SODIUM / 1000 || 0,
              clickedData.CHOLESTEROL / 1000 || 0,
              clickedData.TRANS_FAT || 0,
            ],
            backgroundColor: [
              "#FFEBEC",
              "#FEC5BA",
              "#F8DCC4",
              "#CADBBB",
              "#FFFBA5",
              "#A6C6DD",
              "#AAC4BB",
              "#CCA3C1",
              "#BDC3C7",
            ],
            hoverBackgroundColor: [
              "#FFEBEC",
              "#FEC5BA",
              "#F8DCC4",
              "#CADBBB",
              "#FFFBA5",
              "#A6C6DD",
              "#AAC4BB",
              "#CCA3C1",
              "#BDC3C7",
            ],
          },
        ],
      });
    }
  }, [clickedData]);

  const options = {
    layout: {
      padding: 0, // 간격 없애기
      // padding: {
      //   left: 50, // 왼쪽 간격
      //   right: 50, // 오른쪽 간격
      //   top: 50, // 위쪽 간격
      //   // bottom: 50, // 아래쪽 간격
      // },
    },
    // responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        // display: false,
        position: "top",
        labels: {
          boxWidth: 15,
        },
      },
      tooltip: {
        // label: false,
        // displayColors: false,
        padding: 10,
        caretPadding: 10,
        backgroundColor: "#0E2044",
        xAlign: "center",
        yAlign: "bottom",
        callbacks: {
          // title: function () {
          //   return "";
          // },
          // label: function (context) {
          //   const value = context.parsed.y || 0;
          //   return `${value}명`;
          // },
        },
      },
    },
    elements: {
      point: {
        backgroundColor: "#fff",
        borderColor: "#2D8CFF",
        hoverRadius: 5,
        hoverBackgroundColor: "#fff",
        hoverBorderColor: "#2D8CFF",
      },
    },
    // scales: {
    //   x: {
    //     display: true,
    //     grid: {
    //       display: false,
    //     },
    //   },
    //   y: {
    //     display: false,
    //   },
    // },
  };

  return (
    <div className="chart-wrap">
      <div className="chart">
        <h2>
          <span>{chartFood.NAME}</span> 영양정보
        </h2>

        <Pie data={chartData} options={options} />
        <div className="chart-kcal">
          <h3 className="chart-desc">
            <span>단위</span>
            <span>
              {chartFood.SERVING_SIZE}
              {chartFood.SERVING_UNIT}
            </span>
          </h3>
          <h3 className="chart-desc">
            <span>칼로리</span>
            <span>{chartFood.KCAL}kcal</span>
          </h3>
        </div>

        <div className="modal-close" onClick={closeModal}></div>
      </div>
      <div className="modal-overlay" onClick={closeModal}></div>
    </div>
  );
};

export default Chart;
