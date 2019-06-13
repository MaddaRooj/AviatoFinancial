import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import BudgetManager from "../../modules/BudgetManager"

export default class TaskModal extends Component {
  state = {
    description: "",
    amount: "",
    dateOfPurchase: "",
    budgetId: this.props.budget.id,
    amtRemaining: ""
  };

  handleFieldChange = evt => {

    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  componentDidMount() {
    BudgetManager.get(this.props.match.params.budgetId).then(budget => {
      console.log(budget)
      this.setState({
        amtRemaining: budget.amtRemaining
      });
    });
  }

  constructNewPurchase = evt => {

    let today = new Date();
    let formatTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
    let formattedTime = formatTime.toLocaleString("en-US", { hour12: true });

    const purchase = {
      description: this.state.description,
      amount: this.state.amount,
      dateOfPurchase: formattedTime,
      budgetId: this.state.budgetId
    }

    this.props.addPurchase(purchase);
    this.props.updateBudget({
      id: this.props.match.params.budgetId,
      amtRemaining: JSON.stringify(this.state.amtRemaining - purchase.amount)
    })
    this.props.handleClickYes();
  }

  render() {
    return (
      <Modal backdrop animation size="lg" isOpen={this.props.toggleModal} toggle={this.props.handleClickNo}>
        <ModalHeader>
          Did you make a purchase?
        </ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Purchase Description</InputGroupText>
              </InputGroupAddon>
              <Input type="text" required id="description" onChange={this.handleFieldChange} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Amount  $</InputGroupText>
              </InputGroupAddon>
              <Input type="text" required id="amount" onChange={this.handleFieldChange} />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.constructNewPurchase}>Add Purchase</Button>
          <Button outline color="danger" onClick={this.props.handleClickNo}>Nevermind</Button>
        </ModalFooter>
      </Modal>
    );
  }
}