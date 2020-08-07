import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalTest from './ModalTest';

const Test = () => {
  const [show, setShow] = useState(false);
  const [modalPage, setModalPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePage = e => {
    e.preventDefault();
    if (modalPage === 3) {
      setModalPage(1);
    } else {
      setModalPage(modalPage + 1);
    }

  }



  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        모달 열기
      </Button>
      <ModalTest modalPage={modalPage} show={show} handleClose={handleClose} handlePage={handlePage} />
    </div>
  );
};

export default Test;