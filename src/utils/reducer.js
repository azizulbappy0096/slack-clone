export const initialState = {
  user: null,
  currentWorkSpace: null,
  currentChannel: null,
};

export const actionTypes = {
  SET_USER: "Set__User",
  SET_WORKSPACE: "Set__WorkSpace",
  SET_CHANNEL: "Set__Channel",
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
    default:
      return state;
  }
};

export default reducer;
