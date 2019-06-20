import React, { Component } from "react";
import PurchaseModal from "../purchases/PurchaseModal";
import DeleteBudgetDetailModal from "./modals/deleteBudgetDetailModal";
import EditBudgetModal from "./modals/editBudgetModal";
import "./Budget.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import DeletePurchaseModal from "../purchases/deletePurchaseModal";
import EditPurchaseModal from "../purchases/editPurchase"
// import PurchaseManager from "../../modules/PurchaseManager"

export default class Budget extends Component {
  state = {
    addPurchaseModalShow: false,
    dltBudgetModalShow: false,
    editBudgetModalShow: false,
    dltPurchaseModalShow: false,
    editPurchaseModalShow: false,
    saveDisabled: false,
    purchaseKeyAmount: [],
    amtRemaining: this.props.budget.amtRemaining,
    purchaseKey: 1,
    purchaseKeyDesc: ''
  };

  // opens add purchase modal
  onClickClose = () => {
    this.setState({
      addPurchaseModalShow: true
    });
  };

  // opens edit budget modal
  onClickEditBudget = () => {
    this.setState({
      editBudgetModalShow: true
    });
  };

  // opens delete budget modal
  onClickDeleteBudget = () => {
    this.setState({
      dltBudgetModalShow: true
    });
  };

  // opens delete purchase modal
  onClickDeletePurchase = () => {
    this.setState({
      dltPurchaseModalShow: true
    });
  };

  // opens edit purchase modal
  onClickEditPurchase = () => {
    this.setState({
      editPurchaseModalShow: true
    });
  };

  dltPurchaseModalClickYes = () => {
    this.setState({ dltPurchaseModalShow: false });
  };

  editPurchaseModalClickYes = () => {
    this.setState({ editPurchaseModalShow: false });
  };

  // handles if user clicks 'yes' in delete budget modal view
  handleDeleteBudgetYes = () => {
    this.props.deleteBudget(this.props.budget.id);
    this.setState({ dltBudgetModalShow: false });
  };

  // handles yes click in edit budget modal
  handleEditBudgetYes = () => {
    this.setState({
      editBudgetModalShow: false
    });
  };

  // handles no click in edit budget modal
  handleEditBudgetNo = () => {
    this.setState({
      editBudgetModalShow: false
    });
  };

  // closes the add purchase modal after posting new purchase
  handleClickedYes = () => {
    this.setState({ addPurchaseModalShow: false });
  };

  // closes the add purchase modal no modal click no
  handleClickedNo = () => {
    this.setState({ addPurchaseModalShow: false });
  };

  // closes the delete budget modal when user clicks no
  budgetHandleClickedNo = () => {
    this.setState({ dltBudgetModalShow: false });
  };

  render() {
    return (
      <section className="budgetDetail d-flex justify-content-center">
        <EditBudgetModal
          {...this.props}
          updateBudget={this.props.updateBudget}
          budget={this.props.budget}
          onClickEditBudget={this.onClickEditBudget}
          handleEditBudgetNo={this.handleEditBudgetNo}
          handleEditBudgetYes={this.handleEditBudgetYes}
          toggleModal={this.state.editBudgetModalShow}
        />
        <DeleteBudgetDetailModal
          {...this.props}
          onClickDeleteBudget={this.onClickDeleteBudget}
          deleteYes={this.handleDeleteBudgetYes}
          deleteNo={this.budgetHandleClickedNo}
          toggleModal={this.state.dltBudgetModalShow}
        />
        <PurchaseModal
          {...this.props}
          budget={this.props.budget}
          onClickClose={this.onClickClose}
          handleClickYes={this.handleClickedYes}
          handleClickNo={this.handleClickedNo}
          toggleModal={this.state.addPurchaseModalShow}
        />
        <div key={this.props.budget.id} className="">
          <div className="card-body detail-body">
            <h4 className="card-title">
              {this.props.budget.name}
              <ProgressBar
                animated
                variant="success"
                className="progressBar2 mt-5"
                now={
                  (this.props.budget.amtRemaining /
                    this.props.budget.amtStart) *
                  100
                }
                label={`${Math.round(
                  (this.props.budget.amtRemaining /
                    this.props.budget.amtStart) *
                  100
                )}%`}
              />
            </h4>
            <div className="d-flex flex-row justify-content-around mb-5">
              <h6 className="card-title">{`Total allotted: $${
                this.props.budget.amtStart
                }`}</h6>
              <h6 className="card-title">{`Amount remaining: $${parseFloat(
                this.props.budget.amtRemaining
              ).toFixed(2)}`}</h6>
              <button
                onClick={this.onClickEditBudget}
                className="btn btn-outline-primary"
              >
                <FaEdit />
              </button>
            </div>
            <div className="d-flex flex-row-reverse">
              <button
                onClick={this.onClickDeleteBudget}
                disabled={this.state.saveDisabled}
                className="card-link btn btn-outline-danger"
              >
                <FaTrashAlt size="14px" />
              </button>
              <button
                className="card-link btn btn-outline-primary mr-3"
                onClick={this.onClickClose}
              >
                Enter Purchase <FaPlus className="ml-1"/>
              </button>
            </div>
            <br />
            <div>
              {this.props.purchases
                .filter(purchase => purchase.budgetId === this.props.budget.id)
                .map(purchase => (
                  <div key={purchase.id} className="purchaseList mt-3">
                    <EditPurchaseModal
                      {...this.props}
                      budget={this.props.budget}
                      purchaseKey={this.state.purchaseKey}
                      editPurchaseModalClickYes={this.editPurchaseModalClickYes}
                      purchaseKeyAmount={this.state.purchaseKeyAmount}
                      purchaseKeyDesc={this.state.purchaseKeyDesc}
                      onClickEditPurchase={this.onClickEditPurchase}
                      updateBudget={this.props.updateBudget}
                      updatePurchase={this.props.updatePurchase}
                      toggleModal={this.state.editPurchaseModalShow}
                    />
                    <DeletePurchaseModal
                      budget={this.props.budget}
                      purchases={this.props.purchases}
                      dltPurchaseModalClickYes={this.dltPurchaseModalClickYes}
                      purchaseKey={this.state.purchaseKey}
                      purchaseKeyAmount={this.state.purchaseKeyAmount}
                      onClickDeletePurchase={this.onClickDeletePurchase}
                      deletePurchase={this.props.deletePurchase}
                      updateBudget={this.props.updateBudget}
                      toggleModal={this.state.dltPurchaseModalShow}
                    />
                    <div className="purchase-card-body">
                      <div className="purchase-card-title d-flex flex-row justify-content-between">
                        <h5
                          style={{
                            fontSize: "2rem",
                            fontFamily: "Nanum Myeongjo, serif"
                          }}
                          className="m-3"
                        >
                          {purchase.description}
                        </h5>
                        <h5
                          style={{
                            fontSize: "1.4rem",
                            color: "red",
                            fontFamily: "Nanum Myeongjo, serif"
                          }}
                          className="mt-4"
                        >
                          Amount: -${purchase.amount}
                        </h5>
                      </div>
                      <div className="btnDiv d-flex flex-row justify-content-between mt-3">
                        <h5
                          style={{
                            fontSize: "1rem",
                            fontFamily: "Nanum Myeongjo, serif"
                          }}
                          className="mt-2 ml-3"
                        >
                          Date: {purchase.dateOfPurchase}
                        </h5>
                        <div>
                          <button
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                purchaseKey: purchase.id,
                                purchaseKeyAmount: purchase.amount,
                                purchaseKeyDesc: purchase.description
                              });
                              this.onClickEditPurchase();
                            }}
                            className="btn btn-sm btn-outline-primary mr-4 mt-3"
                          >
                            <FaEdit />
                          </button>
                          <button
                            title="Delete"
                            onClick={() => {
                              this.setState({
                                purchaseKey: purchase.id,
                                purchaseKeyAmount: purchase.amount,
                              });
                              this.onClickDeletePurchase();
                            }}
                            className="btn btn-sm btn-outline-danger mt-3"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
