import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';

const PostcodeButton = ({onPostcodeSelected}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true)
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    onPostcodeSelected(fullAddress);
    setShow(false);
  }

  return (
    <div>
      <button
        type="submit"
        className="btn btn-outline-secondary"
        onClick={handleShow}
      >
        주소 검색
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>주소 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcode onComplete={handleComplete} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostcodeButton;