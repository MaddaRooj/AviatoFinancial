import React, { Component } from "react";
import "./Home.css";
import { Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Home extends Component {
  // state = {
  //   data: [],
  //   categories: [],
  //   total: []
  // };

  // // getData function will get all purchase amounts, push them to array, and set array as data for graphs
  // getData = () => {
  //   const newState = {};
  //   // arrays to push purchase amounts and names
  //   const arr = [];
  //   const arr2 = [];
  //   // function variable for .reduce of purchase amounts -- will add all amounts for total
  //   let reducer = (accumulator, currentValue) =>
  //     parseFloat(accumulator) + parseFloat(currentValue);
  //   // Data push
  //   this.props.purchases.forEach(purchase => {
  //     arr.push(parseFloat(purchase.amount));
  //     arr2.push(purchase.description);
  //   });
  //   newState.data = arr;
  //   newState.categories = arr2;
  //   if (arr.length > 0) {
  //     newState.total = arr.reduce(reducer, 0);
  //   }
  //   this.setState(newState);
  // };

  // componentDidMount() {
  //   this.getData();
  // }

  render() {
    return (
      <section className="home">
        <div className="homeDiv">
          <h2
            className="d-flex justify-content-center"
            style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: "3rem" }}
          >
            Hello, {this.props.user.firstName}!
          </h2>
          <h4
            className="d-flex justify-content-center"
            style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: "2.5rem" }}
          >
            Welcome to Aviato Financial, your personal financial advisor!
          </h4>
        </div>
        {/* <div className="graphDiv mt-4">
          <div className="d-flex flex-column justify-content-center">
            <h1 className="m-3 d-flex justify-content-center">
              Your Total Spending
            </h1>
            <select className="m-3 d-flex justify-content-center">
              <option value="total">Total Purchases</option>
              <option value="month">Purchases by Month</option>
              <option value="category">Purchases by Category</option>
            </select>
          </div>
          <div className="graph mt-4">
            <Doughnut
              className="graph"
              data={{
                labels: this.state.categories,
                datasets: [
                  {
                    label: "Dollars Spent",
                    data: this.state.data,
                    backgroundColor: [
                      "#8A212A",
                      "#3A488F",
                      "#EB9AAA",
                      "#81F0AA",
                      "#FC1653"
                    ]
                    // hoverBackgroundColor: ["#8A212F", "#3A4880", "#EB9FFF", "#81F099"]
                  }
                ]
              }}
              options={{
                legend: {
                  position: "right"
                },
                tooltips: {
                  titleFontSize: 24,
                  bodyFontSize: 20,
                  callbacks: {
                    title: function(tooltipItem, data) {
                      return data["labels"][tooltipItem[0]["index"]];
                    },
                    label: function(tooltipItem, data) {
                      return (
                        "  $" +
                        data["datasets"][0]["data"][tooltipItem["index"]]
                      );
                    },
                    afterLabel: (tooltipItem, data) => {
                      let dataset = data["datasets"][0];
                      let percent = Math.round(
                        (dataset["data"][tooltipItem["index"]] /
                          this.state.total) * 100
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
        </div> */}
      </section>
    );
  }
}
