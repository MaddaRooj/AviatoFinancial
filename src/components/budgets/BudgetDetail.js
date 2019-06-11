import React, { Component } from "react"
import "./Budget.css"
import ProgressBar from 'react-bootstrap/ProgressBar'
import "bootstrap/dist/css/bootstrap.min.css"
import {FaTrashAlt} from "react-icons/fa"

export default class Budget extends Component {
  state = {
    saveDisabled: false,
    now: 75
  }

  render() {
    return (
      <section className="budgetDetail d-flex justify-content-center">
        <div key={this.props.budget.id} className="">
          <div className="card-body detail-body">
            <h4 className="card-title">
              {/* <img src={ dog } alt="dog" className="icon--dog" /> */}
              {this.props.budget.name}
            <ProgressBar animated variant="success" className="progressBar2 mt-5" now={this.state.now} label={`${this.state.now}%`} />
            </h4>
            <h6 className="card-title">{this.props.budget.amtStart}</h6>
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
            </div>
          </div>
        </div>
      </section>
    )
  }
}