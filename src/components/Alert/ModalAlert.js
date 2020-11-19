import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import { ReportProblemOutlined } from '@material-ui/icons';
import './ModalAlert.css';

const ModalAlert = ({ show, content, setShow }) => {
  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      size="sm"
      className="modalAlert"
    >
      <Modal.Body>
        <ReportProblemOutlined className="modalAlert__icon" />
        <h2>Thông báo!</h2>
        <p>{content}</p>
        <br />
        <Button
          variant="warning"
          onClick={() => setShow(false)}
          className="modalAlert__button"
        >
          Continue...
          </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAlert;
