import React from 'react';
import { Modal } from 'Components/Modal';

import classes from './DeletModal.module.css';
import { Icon } from 'Components/Icons';

const DeleteModal = ({ setDeleteModal, deleteHandler }) => {
  return (
    <Modal isOpen classes={classes}>
      <div className={classes.delete}>
        <div className={classes.header}>
          <Icon type="projects" />
          <p>Delete Contract Form</p>
          <Icon onClick={() => setDeleteModal(null)} type="close" />
        </div>

        <span className={classes.warn}>Are you sure you want to delete this form?</span>

        <div className={classes.handlers}>
          <button onClick={deleteHandler}>Delete</button>
          <button onClick={() => setDeleteModal(null)}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
