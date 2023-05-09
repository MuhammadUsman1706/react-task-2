import { handleApiRequest } from 'Utils/handleApiRequest';

export const getMyContractForms =
  (companyId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/companies/${companyId}/contract-forms`, {
        params: {
          include: 'company_id,name,replacement_tags,status,template,has_signature',
        },
      })
    );

    dispatch({
      type: 'FETCH_FORMS',
      payload: response.data,
    });
  };
