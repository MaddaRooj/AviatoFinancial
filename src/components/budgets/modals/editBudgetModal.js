import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"

export default class EditBudgetModal extends Component {
  state = {
    name: this.props.budget.name,
    originalAmtStart: this.props.budget.amtStart,
    amtStart: this.props.budget.amtStart,
    amtRemaining: this.props.budget.amtRemaining,
    dateEnd: this.props.dateEnd,
    id: this.props.budget.id,
    userId: this.props.budget.userId
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  editBudgetObject = evt => {
    const budget = {
      name: this.state.name,
      amtStart: this.state.amtStart,
      amtRemaining: (parseFloat(this.state.amtRemaining) + (parseFloat(this.state.amtStart) - parseFloat(this.state.originalAmtStart))),
      dateEnd: this.state.dateEnd,
      id: this.state.id,
      userId: this.state.userId
    }
    console.log("budget",budget)
    this.props.updateBudget(budget);
    this.props.handleEditBudgetYes();
  }

  render() {
    return (
      <Modal backdrop size="lg" isOpen={this.props.toggleModal} toggle={this.props.handleClickNo}>
        <ModalHeader>
          Do you need to edit this budget?
        </ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Budget Name</InputGroupText>
              </InputGroupAddon>
              <Input placeholder={this.props.budget.name} type="text" required id="name" onChange={this.handleFieldChange} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Total Budget</InputGroupText>
              </InputGroupAddon>
              <Input placeholder={this.props.budget.amtStart} type="text" required id="amtStart" onChange={this.handleFieldChange} />
            </InputGroup>
            <InputGroup className="mt-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Total Budget</InputGroupText>
              </InputGroupAddon>
              <Input type="date" required id="dateEnd" onChange={this.handleFieldChange} />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.editBudgetObject}>Edit Budget</Button>
          <Button outline color="danger" onClick={this.props.handleEditBudgetYes}>Nevermind</Button>
        </ModalFooter>
      </Modal>
    );
  }
}