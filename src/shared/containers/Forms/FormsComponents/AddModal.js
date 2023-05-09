import React, { useState } from 'react';
import { Modal } from 'Components/Modal';
import { Icon } from 'Components/Icons';
import { Api } from 'Utils/api';
import { useSelector } from 'react-redux';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { areEqual } from 'Utils/equalityChecks';

import classes from './AddModal.module.css';

const AddModal = ({ refreshData, setAddModal }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [signature, setSignature] = useState(false);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);

  const inputHelperHandler = (event) => {
    const value = event.target.id;
    if (textAreaValue) setTextAreaValue((prevState) => `${prevState} \r\n${value}`);
    else setTextAreaValue(value);
  };

  const submitContractHandler = async () => {
    const values = textAreaValue
      ?.replaceAll('\r\n', '')
      ?.trim()
      ?.split('~~~')
      ?.filter((n) => n.trim());

    if (values && values?.length === 4) {
      const response = await Api.post('/contract-forms', {
        company_id: firstCompanyId,
        name: values[0],
        replacement_tags: values[1],
        status: values[2],
        template: values[3],
        has_signature: signature,
      });

      if (response.status) {
        refreshData(true);
        setAddModal(false);
      }
    } else {
      alert('Please input all the values in the correct syntax!');
    }
  };

  return (
    <Modal classes={classes} isOpen>
      <div>
        <div className={classes.heading}>
          <div>
            <Icon type="projects" />
            <h5>Add Contract Form</h5>
          </div>
          <Icon onClick={() => setAddModal(false)} type="close" />
        </div>

        <div className={classes.dec}>
          <p>Form Name</p>

          <p>Authorization Form</p>
        </div>

        <div className={classes.reset}>
          <label htmlFor="reqsig">Require Signature</label>
          <input
            checked={signature}
            onChange={(event) => setSignature(event.target.checked)}
            type="checkbox"
            name="reqsig"
            id="reqsig"
          />
        </div>

        <div className={classes.inputs}>
          <label htmlFor="contract">Contract Template</label>

          <br />
          <div className={classes.inputss}>
            <div>
              <span onClick={inputHelperHandler} id="~~~name~~~">
                ~~~name~~~
              </span>
              <span onClick={inputHelperHandler} id="~~~replacement_tags~~~">
                ~~~replacement_tags~~~
              </span>
              <span onClick={inputHelperHandler} id="~~~status~~~">
                ~~~status~~~
              </span>
              <span onClick={inputHelperHandler} id="~~~template~~~">
                ~~~template~~~
              </span>
            </div>
            <textarea
              value={textAreaValue}
              onChange={(event) => setTextAreaValue(event.target.value)}
              name="contract"
              id="contract"
              cols="100"
              rows="10"
            ></textarea>
          </div>

          <button onClick={submitContractHandler} className={classes.submit}>
            Add Contract
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
