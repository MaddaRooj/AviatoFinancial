import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class Graph extends Component {
  render() {
    return (
      <div className="graphDiv mt-4">
        <div className="d-flex flex-column justify-content-center">
          <h1 style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: '2rem' }} className="m-3 d-flex justify-content-center">
            Your Spending this Year
              </h1>
        </div>
        <div className="graph mt-4">
          <Bar
            className="graph"
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  borderColor: "black",
                  data: [1113.24, 1325.54, 1106.25, 1564.32, 1203.25, 1306.54, this.props.total],
                  backgroundColor: [
                    "#8A212A",
                    "#3A488F",
                    "#EB9AFF",
                    "#81F0AA",
                    "#93A3BC",
                    "#2274A5",
                    "#37505C",
                    "#F76F8E",
                    "#89A6FB",
                    "#548687",
                    "#FCAA67",
                    "#5CF64A"
                  ]
                  // hoverBackgroundColor: ["#8A212F", "#3A4880", "#EB9FFF", "#81F099"]
                }
              ]
            }}
            options={{
              scales: {
                yAxes: [{
                  display: true,
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              legend: {
                display: false
              },
              tooltips: {
                titleFontSize: 24,
                bodyFontSize: 20,
                callbacks: {
                  title: function (tooltipItem, data) {
                    return data["labels"][tooltipItem[0]["index"]];
                  },
                  label: function (tooltipItem, data) {
                    return (
                      "  $" +
                      data["datasets"][0]["data"][tooltipItem["index"]].toFixed(2)
                    );
                  }
                },
                responsive: true,
                maintainAspectRatio: false
              }
            }}
          />
        </div>
      </div>
    )
  }
}