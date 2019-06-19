import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class DeletePurchaseModal extends Component {

  // Function will add the purchase back to the remaining budget, delete the purchase from db, and close modal
  deletePurchaseFunc = () => {
    this.props.updateBudget({
      amtRemaining: JSON.stringify(parseFloat(this.props.budget.amtRemaining) + parseFloat(this.props.purchaseKeyAmount)),
      id: this.props.budget.id
    });
    this.props.deletePurchase(this.props.purchaseKey);
    this.props.dltPurchaseModalClickYes();
  }

  render() {
    return (
      <Modal isOpen={this.props.toggleModal} toggle={this.props.dltPurchaseModalClickNo}>
        <ModalHeader>
          Delete this Purchase?
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this purchase? It's associated amount will be added back to your remaining budget.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.deletePurchaseFunc}>Yes</Button>
          <Button outline color="danger" onClick={this.props.dltPurchaseModalClickYes}>No</Button>
        </ModalFooter>
      </Modal>
    );
  }
}