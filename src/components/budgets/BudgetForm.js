import React, { Component } from "react";
import "./Budget.css";
import "bootstrap/dist/css/bootstrap.min.css"

export default class BudgetForm extends Component {
  state = {
    name: "",
    amtStart: "",
    categoryId: "",
    amtRemaining: "",
    dateEnd: "",
    userId: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewBudget = evt => {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    evt.preventDefault();
    if (!this.state.categoryId) {
      window.alert("Please select a category for your budget.");
    } else {
      const budget = {
        name: this.state.name,
        amtStart: this.state.amtStart,
        amtRemaining: this.state.amtStart,
        dateEnd: this.state.dateEnd,
        categoryId: parseInt(this.state.categoryId),
        userId: currentUser.id
      };
      this.props
        .addBudget(budget)
        .then(() => this.props.history.push("/budgets"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="budgetForm">
          <div className="form-group">
            <label className="formText" htmlFor="name">Budget Description</label>
            <input
              style={{ width: "60%" }}
              type="text"
              required
              className="form-control mt-2 mb-4"
              onChange={this.handleFieldChange}
              id="name"
              placeholder="Budget Name"
            />
          </div>
          <div className="form-group">
            <label className="formText" htmlFor="amtStart">Total Budget</label>
            <div style={{ width: "60%" }} className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text mt-2 mb-4">$</span>
              </div>
              <input
                type="text"
                required
                className="form-control mt-2 mb-4"
                onChange={this.handleFieldChange}
                id="amtStart"
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="formText" htmlFor="dateEnd">Date</label>
            <input
              style={{ width: "30%" }}
              type="date"
              required
              className="form-control mt-2 mb-4"
              onChange={this.handleFieldChange}
              id="dateEnd"
            />
          </div>
          <div className="form-group">
            <label className="formText mr-2" htmlFor="category">Category: </label>
            <br></br>
            <select
              className="formText mt-2"
              style={{fontSize: "17px"}}
              defaultValue=""
              name="category"
              id="categoryId"
              onChange={this.handleFieldChange}
            >
              <option style={{fontSize: "17px"}} className="formText" value="">Select a Category</option>
              {this.props.categories.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              onClick={this.constructNewBudget}
              className="btn btn-outline-primary"
            >
              Submit
          </button>
            <button
              onClick={() => this.props.history.push("/budgets")}
              className="btn btn-outline-danger ml-3"
            >
              Cancel
          </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}