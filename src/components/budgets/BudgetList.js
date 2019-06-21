import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Budget.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaPlus, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import DeleteBudgetModal from './modals/deleteBudgetModal'
import Multigraph from '../graphs/Multigraph'
import NewBudgetModal from './modals/newBudgetModal'

export default class BudgetList extends Component {
  state = {
    data: [],
    categories: [],
    total: [],
    modalShow: false,
    newBudgetModalShow: false,
    budgetKey: 1
  };

  // getData function will get all purchase amounts, push them to array, and set array as data for graphs
  getData = () => {
    const newState = {};
    // Gets the current month in order to filter purchases
    let options = { month: 'long' };
    let today = new Date();
    let date = today.toLocaleDateString("en-US", options);
    // arrays to push purchase amounts and names
    const arr = [];
    const arr2 = [];
    // function variable for .reduce of purchase amounts -- will add all amounts for total
    let reducer = (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue);
    // Data push
    this.props.purchases.filter(purchase => purchase.userId === this.props.user.id && purchase.dateOfPurchase.split(" ")[0] === date)
      .forEach(purchase => {
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

  handleClickedDeleteYes = () => {
    this.props.deleteBudget(this.state.budgetKey)
    this.setState({ modalShow: false })
  }

  handleClickedNewBudget = () => {
    this.setState({newBudgetModalShow: true})
  }

  handleClickedNewBudgetNo = () => {
    this.setState({newBudgetModalShow: false})
  }

  handleClickedNo = () => {
    this.setState({ modalShow: false });
  }

  onClickClose = () => {
    this.setState({
      modalShow: true
    })
  }

  handleSearch(input) {
    if (input.keyCode === 13) {
      this.props.getSearchResults(input.target.value);
      this.props.history.push("/search");
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="budgetDiv">
        <NewBudgetModal {...this.props} user={this.props.user} addBudget={this.props.addBudget} toggleModal={this.state.newBudgetModalShow} handleClickNewBudgetNo={this.handleClickedNewBudgetNo}/>
        <div className="budgetButton d-flex justify-content-between">
          <h2 style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: '2.4rem' }} className="ml-5">
            Your Financial Profile
          </h2>
          <button
            type="button"
            className="ui inverted violet button mr-5"
            onClick={this.handleClickedNewBudget}
          >
            Add New Budget <FaPlus className="mb-1 ml-1" />
          </button>
        </div>
        <hr />
        <section className="budgets d-flex flex-row justify-content-around">
          <Multigraph {...this.props} categories={this.state.categories} data={this.state.data} total={this.state.total} />
          <div className="listDiv d-flex flex-column align-items-center">
            <div className="mt-3 mb-3">
              <h1 className="budgetListHead d-flex justify-self-center" style={{ fontFamily: "Nanum Myeongjo, serif", fontSize: "2rem" }}>Your Budgets</h1>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Search budgets</InputGroupText>
                </InputGroupAddon>
                <Input onKeyUp={e => this.handleSearch(e)} />
              </InputGroup>
            </div>
            <div>
              {/* <SearchResults searchResults={this.props.searchResults}/> */}
            </div>
            <div className="budgetListScroll d-flex flex-column align-items-center">
              {this.props.budgets
                .filter(budget => budget.userId === this.props.user.id)
                .map(budget => (
                  <div key={budget.id} className="mt-3">
                    <DeleteBudgetModal toggleModal={this.state.modalShow} handleClickYes={this.handleClickedDeleteYes} handleClickNo={this.handleClickedNo} />
                    <div className="card-body">
                      <div>
                        <h5 style={{ fontFamily: 'EB Garamond, serif', fontSize: '1.2rem' }} className="d-flex justify-content-end">Budget End: <span className="ml-1" style={{ fontSize: '1.3rem' }}>{budget.dateEnd}</span></h5>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <h5 style={{ fontSize: "2rem", fontFamily: "Nanum Myeongjo, serif" }} className="card-title">
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
                          onClick={() => { this.setState({ budgetKey: budget.id }); this.onClickClose() }}
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
