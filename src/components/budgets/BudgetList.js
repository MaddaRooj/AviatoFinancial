import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Budget.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaPlus, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { Doughnut } from "react-chartjs-2";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

export default class BudgetList extends Component {
  state = {
    data: [],
    categories: [],
    total: []
  };

  // getData function will get all purchase amounts, push them to array, and set array as data for graphs
  getData = () => {
    const newState = {};
    // arrays to push purchase amounts and names
    const arr = [];
    const arr2 = [];
    // function variable for .reduce of purchase amounts -- will add all amounts for total
    let reducer = (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue);
    // Data push
    this.props.purchases.forEach(purchase => {
      arr.push(parseFloat(purchase.amount));
      arr2.push(purchase.description);
    });
    newState.data = arr;
    newState.categories = arr2;
    if (arr.length > 0) {
      newState.total = arr.reduce(reducer, 0);
    }
    this.setState(newState);
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="budgetDiv">
        <div className="budgetButton d-flex justify-content-between">
          <h2 style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: '2.4rem' }} className="ml-5">
            Your Financial Profile
          </h2>
          <button
            type="button"
            className="ui violet button mr-5"
            onClick={() => {
              this.props.history.push("/budgets/new");
            }}
          >
            Add New Budget <FaPlus className="mb-1 ml-1" />
          </button>
        </div>
        <hr />
        <section className="budgets d-flex flex-row justify-content-around">
          <div className="graphDiv mt-4">
            <div className="d-flex flex-column justify-content-center">
              <h1 style={{fontFamily: "Nanum Myeongjo, serif", fontSize: '2rem'}} className="m-3 d-flex justify-content-center">
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
                  labels: this.state.categories,
                  datasets: [
                    {
                      borderColor: "black",
                      label: "Dollars Spent",
                      data: this.state.data,
                      backgroundColor: [
                        "#8A212A",
                        "#3A488F",
                        "#EB9AAA",
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
                            this.state.total) *
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
          <div className="listDiv d-flex flex-column align-items-center mt-4">
            <div className="mt-3 mb-3">
              <h1 className="budgetListHead d-flex justify-self-center" style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: "2rem" }}>Your Budgets</h1>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Search your budgets</InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>
            </div>
            <div className="budgetListScroll d-flex flex-column align-items-center">
              {this.props.budgets
                .filter(budget => budget.userId === this.props.user.id)
                .map(budget => (
                  <div key={budget.id} className="mt-3">
                    <div className="card-body">
                      <div className="card-title">
                        <h5 style={{ fontSize: "2rem" }} className="card-title">
                          {budget.name}
                        </h5>
                        <ProgressBar
                          animated
                          now={(budget.amtRemaining / budget.amtStart) * 100}
                          label={`${Math.round(
                            (budget.amtRemaining / budget.amtStart) * 100
                          )}%`}
                          variant="success"
                          className="progressBar m-3"
                        />
                      </div>
                      <div className="btnDiv d-flex flex-row-reverse">
                        <button
                          title="Delete"
                          onClick={() => this.props.deleteBudget(budget.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <FaTrashAlt size="14px" />
                        </button>
                        <Link
                          title="Details"
                          className="btn btn-sm btn-outline-primary mr-2"
                          to={`/budgets/${budget.id}`}
                        >
                          <FaInfoCircle size="14px" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
