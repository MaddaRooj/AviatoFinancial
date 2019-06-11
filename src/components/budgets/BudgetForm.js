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
            <label htmlFor="name">Budget Description</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
              placeholder="Budget Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amtStart">Total Budget</label>
            <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">$</span>
            </div>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="amtStart"
              placeholder="Amount"
            />
          </div>
            </div>
          <div className="form-group">
            <label htmlFor="dateEnd">Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="dateEnd"
            />
          </div>
          <div className="form-group">
            <label className="mr-2" htmlFor="category">Category: </label>
            <select
              defaultValue=""
              name="category"
              id="categoryId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a Category</option>
              {this.props.categories.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            onClick={this.constructNewBudget}
            className="btn btn-outline-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}