import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class DeleteBudgetModal extends Component {
  render () {
    return (
      <Modal isOpen={ this.props.toggleModal } toggle={ this.props.handleClickNo }>
        <ModalHeader>
          Delete this Budget
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this budget? All purchases associated with this budget will also be deleted.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={ this.props.handleClickYes }>Yes</Button>
          <Button outline color="danger" onClick={ this.props.handleClickNo }>No</Button>
        </ModalFooter>
      </Modal>
    );
  }
}