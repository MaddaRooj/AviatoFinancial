import React, { Component } from "react"
import PurchaseModal from "../purchases/PurchaseModal"
import "./Budget.css"
import ProgressBar from 'react-bootstrap/ProgressBar'
import "bootstrap/dist/css/bootstrap.min.css"
import { FaTrashAlt } from "react-icons/fa"
import BudgetManager from "../../modules/BudgetManager"

export default class Budget extends Component {
  state = {
    modalShow: false,
    saveDisabled: false,
    now: (this.props.budget.amtRemaining / this.props.budget.amtStart) * 100,
    amtRemaining: ""
  }

  onClickClose = () => {
    this.setState({
      modalShow: true
    })
  }

  handleClickedDeleteYes = () => {
    console.log("Modal button click yes");
    this.setState({ modalShow: false })
    // this.props.removeItem(this.props.item.id);
  }

  handleClickedNo = () => {
    this.setState({ modalShow: false });
  }

  componentDidMount() {
    BudgetManager.get(this.props.match.params.budgetId).then(budget => {
      this.setState({
        amtRemaining: budget.amtRemaining
      });
    });
  }

  render() {
    return (
      <section className="budgetDetail d-flex justify-content-center">
        <PurchaseModal {...this.props} budget={this.props.budget} onClickClose={this.onClickClose} handleClickYes={this.handleClickedDeleteYes} handleClickNo={this.handleClickedNo} toggleModal={this.state.modalShow} />
        <div key={this.props.budget.id} className="">
          <div className="card-body detail-body">
            <h4 className="card-title">
              {/* <img src={ dog } alt="dog" className="icon--dog" /> */}
              {this.props.budget.name}
              <ProgressBar animated variant="success" className="progressBar2 mt-5" now={this.state.now} label={`${this.state.now}%`} />
            </h4>
            <h6 className="card-title">{`Total allotted: $${this.props.budget.amtStart}`}</h6>
            <h6 className="card-title">{`Amount remaining: $${this.props.budget.amtRemaining}`}</h6>
            <div className="d-flex flex-row-reverse">
              <button onClick={
                () => {
                  this.setState(
                    { saveDisabled: true },
                    () => this.props.deleteBudget(this.props.budget.id)
                  )
                }
              }
                disabled={this.state.saveDisabled}
                className="card-link btn btn-outline-danger"><FaTrashAlt size="14px" />
              </button>
              <button className="card-link btn btn-outline-primary mr-3" onClick={this.onClickClose}>Enter Purchase</button>
            </div>
            <br></br>
            <div>
              {
                this.props.purchases.filter(purchase => purchase.budgetId === this.props.budget.id).map(purchase =>
                  <div key={purchase.id} className="purchaseList mt-3">
                    <div className="purchase-card-body">
                      <div className="purchase-card-title">
                        <h5 style={{ fontSize: '2rem', fontFamily: "Cinzel Decorative, cursive" }} className="purchase-card-title">{purchase.description}</h5>
                        <h5 style={{ fontSize: '1rem', fontFamily: "Cinzel Decorative, cursive" }} className="purchase-card-title">Date: {purchase.dateOfPurchase}</h5>
                        <h5 style={{ fontSize: '1.4rem', color: "red", float: "right", fontFamily: "Cinzel Decorative, cursive" }} className="purchase-card-title">Amount: -${purchase.amount}</h5>
                      </div>
                      <div className="btnDiv d-flex flex-row-reverse">
                        <button title="Delete"
                          onClick={() => {
                            console.log("purchase amount", purchase.amount);
                            console.log("this.state.amtRemaining", this.state.amtRemaining)
                            // this.forceUpdate();
                            // this.props.deletePurchase(purchase.id);
                            // this.props.updateBudget({
                            //   amtRemaining: JSON.stringify(parseInt(this.state.amtRemaining) + parseInt(purchase.amount)),
                            //   id: this.props.match.params.budgetId
                            // });
                          }}
                          className="btn btn-sm btn-outline-danger mt-5"><FaTrashAlt size="14px" /></button>
                        {/* <Link title="Details" className="btn btn-sm btn-outline-primary mr-2" to={`/budgets/${budget.id}`}><FaInfoCircle size="14px" /></Link> */}
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