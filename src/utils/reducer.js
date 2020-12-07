export const initialState = {
  user: null,
  currentWorkSpace: null,
  currentChannel: null,
  ShowSidebar: false
};

export const actionTypes = {
  SET_USER: "Set__User",
  SET_WORKSPACE: "Set__WorkSpace",
  SET_CHANNEL: "Set__Channel",
  SET_SIDEBAR: "Set__ShowSidebar"
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.channel,
      };
    case actionTypes.SET_WORKSPACE:
      return {
        ...state,
        currentWorkSpace: action.workSpace,
      };
    case actionTypes.SET_SIDEBAR:
      return {
        ...state,
        ShowSidebar: action.sidebar
      }  
    default:
      return state;
  }
};

export default reducer;
