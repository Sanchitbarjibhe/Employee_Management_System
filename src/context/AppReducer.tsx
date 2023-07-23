
export default function appReducer(state: any, action: { type: any; payload: any; }) {
  switch (action.type) {
    case 'EDIT_EMPLOYER':
      const updateEmp = action.payload;
      return {
        ...state,
        employer: updateEmp,
      };
    case 'GET_ONE_EMP':
      const getEmp = action.payload;
      const getOneEmp = state.notes.filter((emp: { id: any; }) => {
        if (emp.id === getEmp.id) {
          return getEmp;
        }
        return emp;
      });
      return {
        ...state,
        emps: getOneEmp,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        employer: null,
        setAuthentication: false,
        error: action.payload,
      };
    default:
      return state;
  }
}