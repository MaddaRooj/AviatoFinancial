import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

export default class Graph extends Component {
  render() {
    return (
      <div className="graphDiv mt-4">
        <div className="d-flex flex-column justify-content-center">
          <h1 style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: '2rem' }} className="m-3 d-flex justify-content-center">
            Your Total Spending
              </h1>
          <select onChange={(e) => console.log(e.target.value)} className="m-3 d-flex justify-content-center">
            <option value="total">Total Purchases</option>
            <option value="month">Purchases by Month</option>
            <option value="category">Purchases by Category</option>
          </select>
        </div>
        <div className="graph mt-4">
          <Doughnut
            className="graph"
            data={{
              labels: this.props.categories,
              datasets: [
                {
                  borderColor: "black",
                  label: "Dollars Spent",
                  data: this.props.data,
                  backgroundColor: [
                    "#8A212A",
                    "#3A488F",
                    "#EB9AFF",
                    "#81F0AA",
                    "#FC1653",
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
              cutoutPercentage: 65,
              legend: {
                position: "right"
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
                      data["datasets"][0]["data"][tooltipItem["index"]]
                    );
                  },
                  afterLabel: (tooltipItem, data) => {
                    let dataset = data["datasets"][0];
                    let percent = Math.round(
                      (dataset["data"][tooltipItem["index"]] /
                        this.props.total) *
                      100
                    );
                    return "  (" + percent + "%)";
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