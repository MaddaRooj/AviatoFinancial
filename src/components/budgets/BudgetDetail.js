import React, { Component } from "react"
import PurchaseModal from "../purchases/PurchaseModal"
import DeleteBudgetDetailModal from './deleteBudgetDetailModal'
import "./Budget.css"
import ProgressBar from 'react-bootstrap/ProgressBar'
import "bootstrap/dist/css/bootstrap.min.css"
import { FaTrashAlt } from "react-icons/fa"
// import PurchaseManager from "../../modules/PurchaseManager"

export default class Budget extends Component {
  state = {
    addPurchaseModalShow: false,
    dltBudgetModalShow: false,
    dltPurchaseModalShow: false,
    saveDisabled: false,
    amtRemaining: this.props.budget.amtRemaining
  }

  onClickClose = () => {
    this.setState({
      addPurchaseModalShow: true
    })
  }

  onClickDeleteBudget = () => {
    this.setState({
      dltBudgetModalShow: true
    })
  }

  onClickDeletePurchase = () => {
    this.setState({
      dltPurchaseModalShow: true
    })
  }

  handleDeleteBudgetYes = () => {
    this.props.deleteBudget(this.props.budget.id)
    this.setState({ dltBudgetModalShow: false })
  }

  handleClickedYes = () => {
    this.setState({ addPurchaseModalShow: false });
  }
  handleClickedNo = () => {
    this.setState({ addPurchaseModalShow: false });
  }

  budgetHandleClickedNo = () => {
    this.setState({ dltBudgetModalShow: false });
  }

  sumPurchases = () => {
    let arr = [];
    let filteredPurchases = this.props.purchases.filter(purchase => purchase.budgetId === this.props.budget.id);
    filteredPurchases.forEach(purchase => {
      arr.push(purchase.amount);
    })
    let reducer = (accumulator, current) => parseFloat(accumulator) + parseFloat(current);
    console.log(arr.reduce(reducer));
  }

  render() {
    return (
      <section className="budgetDetail d-flex justify-content-center">
        <DeleteBudgetDetailModal {...this.props} onClickDeleteBudget={this.onClickDeleteBudget} deleteYes={this.handleDeleteBudgetYes} deleteNo={this.budgetHandleClickedNo} toggleModal={this.state.dltBudgetModalShow} />
        <PurchaseModal {...this.props} budget={this.props.budget} onClickClose={this.onClickClose} handleClickYes={this.handleClickedNo} handleClickNo={this.handleClickedNo} toggleModal={this.state.addPurchaseModalShow} />
        <div key={this.props.budget.id} className="">
          <div className="card-body detail-body">
            <h4 className="card-title">
              {this.props.budget.name}
              <ProgressBar animated variant="success" className="progressBar2 mt-5" now={(this.props.budget.amtRemaining / this.props.budget.amtStart) * 100} label={`${Math.round((this.props.budget.amtRemaining / this.props.budget.amtStart) * 100)}%`} />
            </h4>
            <h6 className="card-title">{`Total allotted: $${this.props.budget.amtStart}`}</h6>
            <h6 className="card-title">{`Amount remaining: $${(parseFloat(this.props.budget.amtRemaining)).toFixed(2)}`}</h6>
            <div className="d-flex flex-row-reverse">
              <button onClick={this.onClickDeleteBudget}
                disabled={this.state.saveDisabled}
                className="card-link btn btn-outline-danger"><FaTrashAlt size="14px" />
              </button>
              <button className="card-link btn btn-outline-primary mr-3" onClick={this.onClickClose}>Enter Purchase</button>
              {/* <button className="card-link btn btn-outline-primary mr-3" onClick={this.sumPurchases}>Sum Purchases</button> */}
            </div>
            <br></br>
            <div>
              {
                this.props.purchases.filter(purchase => purchase.budgetId === this.props.budget.id).map(purchase =>
                  <div key={purchase.id} className="purchaseList mt-3">
                    <div className="purchase-card-body">
                      <div className="purchase-card-title d-flex flex-row justify-content-between">
                        <h5 style={{ fontSize: '2rem', fontFamily: "Nanum Myeongjo, serif" }} className="m-3">{purchase.description}</h5>
                        <h5 style={{ fontSize: '1.4rem', color: "red", fontFamily: "Nanum Myeongjo, serif" }} className="mt-4">Amount: -${purchase.amount}</h5>
                      </div>
                      <div className="btnDiv d-flex flex-row justify-content-between mt-3">
                        <h5 style={{ fontSize: '1rem', fontFamily: "Nanum Myeongjo, serif" }} className="mt-2 ml-3">Date: {purchase.dateOfPurchase}</h5>
                        <button title="Delete"
                          onClick={() => {
                            this.props.deletePurchase(purchase.id);
                            this.props.updateBudget({
                              amtRemaining: JSON.stringify(parseFloat(this.props.budget.amtRemaining) + parseFloat(purchase.amount)),
                              id: this.props.budget.id
                            });
                          }}
                          className="btn btn-sm btn-outline-danger"><FaTrashAlt size="14px" /></button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// Filter through purchases to match budget id
// get the sum of those purchases
// the sum of purchases plus the budget amount remaining will be budget start amount
