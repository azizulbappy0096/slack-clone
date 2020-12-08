export const initialState = {
  user: null,
  currentWorkSpace: null,
  currentChannel: null,
  ShowSidebar: false,
  headerHeight: null
};

export const actionTypes = {
  SET_USER: "Set__User",
  SET_WORKSPACE: "Set__WorkSpace",
  SET_CHANNEL: "Set__Channel",
  SET_SIDEBAR: "Set__ShowSidebar",
  SET_HEADERHEIGHT: "Set__HeaderHeight"
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
      };
    case actionTypes.SET_HEADERHEIGHT:
      return {
        ...state,
        headerHeight: action.headerHeight  
      }  
    default:
      return state;
  }
};

export default reducer;
