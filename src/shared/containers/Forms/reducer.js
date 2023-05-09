const initialState = {
  forms: [],
  refreshData: true,
};

export const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FORMS': {
      return {
        ...state,
        forms: action.payload,
        refreshData: false,
      };
    }
    case 'REFRESH_DATA': {
      return {
        ...state,
        refreshData: true,
      };
    }

    default:
      return state;
  }
};
