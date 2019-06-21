import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText, InputGroupButtonDropdown, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, FormGroup, Label } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"

export default class NewBudgetModal extends Component {
  state = {
    name: "",
    amtStart: "",
    categoryId: "",
    amtRemaining: "",
    dateEnd: "",
    userId: this.props.user.id
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewBudget = evt => {
    const budget = {
      name: this.state.name,
      amtStart: this.state.amtStart,
      amtRemaining: this.state.amtStart,
      dateEnd: this.state.dateEnd,
      userId: this.props.user.id,
      categoryId: parseInt(this.state.categoryId)
    }
    this.props.addBudget(budget);
    this.props.handleClickNewBudgetNo();
  }

  render() {
    return (
      <Modal backdrop size="lg" isOpen={this.props.toggleModal} toggle={this.props.handleClickNewBudgetNo}>
        <ModalHeader>
          You want to set a new Budget?
        </ModalHeader>
        <ModalBody>
          <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Budget Title</InputGroupText>
              </InputGroupAddon>
              <Input type="text" required id="name" onChange={this.handleFieldChange} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Total Budget  $</InputGroupText>
              </InputGroupAddon>
              <Input type="text" required id="amtStart" onChange={this.handleFieldChange} />
            </InputGroup>
            <FormGroup className="mt-3">
            <select
              className="formText mt-2"
              style={{fontSize: "17px"}}
              defaultValue=""
              name="category"
              id="categoryId"
              onChange={this.handleFieldChange}
            >
              <option style={{fontSize: "14px"}}>Select a Category</option>
              {this.props.categories.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            </FormGroup>
            <FormGroup>
              <Input
                type="date"
                name="dateEnd"
                id="dateEnd"
                onChange={this.handleFieldChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.constructNewBudget}>Create Budget</Button>
          <Button outline color="danger" onClick={this.props.handleClickNewBudgetNo}>Nevermind</Button>
        </ModalFooter>
      </Modal>
    );
  }
}