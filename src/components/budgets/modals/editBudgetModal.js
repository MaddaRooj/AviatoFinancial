import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"

export default class EditBudgetModal extends Component {
  state = {
    name: this.props.budget.name,
    amtStart: this.props.budget.amtStart,
    addFunds: 0,
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
      amtStart: (parseFloat(this.props.budget.amtStart) + parseFloat(this.state.addFunds)),
      amtRemaining: (parseFloat(this.props.budget.amtRemaining) + parseFloat(this.state.addFunds)),
      dateEnd: this.state.dateEnd,
      id: this.state.id,
      userId: this.state.userId
    }
    this.props.updateBudget(budget);
    this.props.handleEditBudgetYes();
    this.setState({addFunds: 0})
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
                <InputGroupText>Add Funds</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="$ 0.00" type="text" required id="addFunds" onChange={this.handleFieldChange} />
            </InputGroup>
            <InputGroup className="mt-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Budget End Date</InputGroupText>
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