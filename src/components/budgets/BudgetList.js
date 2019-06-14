import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./Budget.css"
import ProgressBar from 'react-bootstrap/ProgressBar'
import {FaPlus, FaTrashAlt, FaInfoCircle} from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import 'semantic-ui-css/semantic.min.css'

export default class BudgetList extends Component {
  render() {
    return (
      <div className="budgetDiv">
        <div className="budgetButton">
          <button type="button"
            className="ui violet button"
            onClick={() => {
              this.props.history.push("/budgets/new")
            }
            }>
            Add New Budget <FaPlus className="mb-1 ml-1"/>
          </button>
        </div>
        <section className="budgets">
          {
            this.props.budgets.filter(budget => budget.userId === this.props.user.id).map(budget => 
              <div key={budget.id} className="mt-3">
                <div className="card-body">
                  <div className="card-title">
                    {/* <img src={dog} alt="dog" className="icon--dog" /> */}
                    <h5 style={{fontSize: '2rem'}} className="card-title">{budget.name}</h5>
                    <ProgressBar animated now={(budget.amtRemaining / budget.amtStart) * 100} label={`${(budget.amtRemaining / budget.amtStart) * 100}%`} variant="success" className="progressBar m-3"/>
                    </div>
                    <div className="btnDiv d-flex flex-row-reverse">
                    <button title="Delete"
                      onClick={() => this.props.deleteBudget(budget.id)}
                      className="btn btn-sm btn-outline-danger"><FaTrashAlt size="14px"/></button>
                    <Link title="Details" className="btn btn-sm btn-outline-primary mr-2" to={`/budgets/${budget.id}`}><FaInfoCircle size="14px"/></Link>
                    </div>
                  </div>
                </div>
            )
          }
        </section>
      </div>
    )
  }
}