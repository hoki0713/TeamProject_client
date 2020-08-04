import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalTest = ({ modalPage, show, handleClose, handlePage }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(modalPage === 1) &&
            <p>첫 번째 모달</p>
          }
          {(modalPage === 2) &&
            <p>두 번째 모달</p>
          }
          {(modalPage === 3) &&
            <p>세 번째 모달</p>
          }
          <Button variant="secondary" onClick={handlePage}>
            다음으로 넘기기
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalTest;