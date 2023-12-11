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
  // console.log(chartFood);
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

  return (
    <div className="chart-wrap">
      <div className="chart">
        <h2>
          <span>{chartFood.NAME}</span> 영양정보
        </h2>

        <Pie data={chartData} />
        <div className="df jcc">
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

        <p className="m-gray-btn" onClick={closeModal}>
          닫기
        </p>
      </div>
      <div className="modal-overlay" onClick={closeModal}></div>
    </div>
  );
};

export default Chart;
