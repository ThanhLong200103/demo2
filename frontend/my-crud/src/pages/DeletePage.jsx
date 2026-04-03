import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeletePage({ show, handleClose, userId, onDelete }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xoá user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Bạn có chắc muốn xoá user ID: {userId} không?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Huỷ
        </Button>

        <Button variant="danger" onClick={() => onDelete(userId)}>
          Xoá
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeletePage;