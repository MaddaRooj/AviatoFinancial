import React, { Component } from "react"
import PurchaseModal from "../purchases/PurchaseModal"
import "./Budget.css"
import ProgressBar from 'react-bootstrap/ProgressBar'
import "bootstrap/dist/css/bootstrap.min.css"
import {FaTrashAlt} from "react-icons/fa"

export default class Budget extends Component {
  state = {
    modalShow: false,
    saveDisabled: false,
    now: (this.props.budget.amtRemaining / this.props.budget.amtStart) * 100
  }

  onClickClose = () => {
    this.setState({
      modalShow: true
    })
  }

  handleClickedDeleteYes = () => {
    console.log("Modal button click yes");
    this.setState({modalShow: false})
    // this.props.removeItem(this.props.item.id);
  }

  handleClickedNo = () => {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <section className="budgetDetail d-flex justify-content-center">
        <PurchaseModal {...this.props} budget={this.props.budget} onClickClose={this.onClickClose} handleClickYes={ this.handleClickedDeleteYes } handleClickNo={ this.handleClickedNo } toggleModal={ this.state.modalShow }/>
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
                className="card-link btn btn-outline-danger"><FaTrashAlt size="14px"/>
                            </button>
                <button className="card-link btn btn-outline-primary mr-3" onClick={ this.onClickClose }>Enter Purchase</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}