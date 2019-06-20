import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"

export default class EditPurchaseModal extends Component {
  state = {
    description: '',
    amount: 0,
    prevAmount: this.props.purchaseKeyAmount,
    amtRemaining: this.props.budget.amtRemaining,
    budgetId: this.props.budget.id,
    purchaseKey: this.props.purchaseKey,
    purchaseKeyDesc: this.props.purchaseKeyDesc
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  editPurchaseObject = evt => {
    const budget = {
      amtRemaining: (parseFloat(this.props.budget.amtRemaining) + (parseFloat(this.props.purchaseKeyAmount) - parseFloat(this.state.amount))),
      id: this.props.budget.id
    }
    const purchase = {
        description: this.state.description,
        amount: this.state.amount,
        id: this.props.purchaseKey
    }
    this.props.updateBudget(budget);
    this.props.updatePurchase(purchase);
    this.props.editPurchaseModalClickYes();
  }

  render() {
    return (
      <Modal backdrop size="lg" isOpen={this.props.toggleModal} toggle={this.props.editPurchaseModalClickYes}>
        <ModalHeader>
          Do you need to edit this purchase?
        </ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Purchase Description</InputGroupText>
              </InputGroupAddon>
              <Input placeholder={this.props.purchaseKeyDesc} type="text" required id="description" onChange={this.handleFieldChange} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Edit Amount</InputGroupText>
              </InputGroupAddon>
              <Input placeholder={this.props.purchaseKeyAmount} type="text" required id="amount" onChange={this.handleFieldChange} />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.editPurchaseObject}>Edit Budget</Button>
          <Button outline color="danger" onClick={this.props.editPurchaseModalClickYes}>Nevermind</Button>
        </ModalFooter>
      </Modal>
    );
  }
}