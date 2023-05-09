import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyContractForms } from './actions';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { areEqual } from 'Utils/equalityChecks';

import classes from './Forms.module.css';
import { Icon } from 'Components/Icons';
import AddModal from './FormsComponents/AddModal';
import { Api } from 'Utils/api';
import DeleteModal from './FormsComponents/DeleteModal';

const Forms = () => {
  // const [refreshData, setRefreshData] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const { forms, refreshData } = useSelector((state) => state?.forms);
  const dispatch = useDispatch();
  console.log(refreshData);

  const setRefreshData = (value) => {
    dispatch({ type: 'REFRESH_DATA' });
  };

  const fetchForms = async () => {
    console.log('FETCHING');
    await dispatch(getMyContractForms(firstCompanyId));
  };

  const deleteContractHandler = async () => {
    await Api.delete(`/contract-forms/${deleteModal}`);
    setRefreshData(true);
    setDeleteModal(false);
  };

  useEffect(() => {
    if (refreshData) fetchForms();
  }, [refreshData]);

  return (
    <div className={classes.forms}>
      <div className={classes.mark}>
        <Icon type="projects" />
        <h6>Contract Forms</h6>
      </div>

      <div className={classes.add}>
        <h1>Form Templates</h1>
        <button onClick={() => setAddModal(true)}>Add +</button>
      </div>

      <div className={classes['table-parent']}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>TEMPLATE NAME</th>
              <th>DATE CREATED</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {!refreshData ? (
              forms?.map((form) => (
                <tr>
                  <td>{form.name}</td>
                  <td className={classes.date}>{new Date(form.created_at).toDateString()}</td>
                  <td onClick={() => setDeleteModal(form.id)}>
                    <Icon type="trash" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {addModal && <AddModal refreshData={setRefreshData} setAddModal={setAddModal} />}
      {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} deleteHandler={deleteContractHandler} />}
    </div>
  );
};

export default Forms;
