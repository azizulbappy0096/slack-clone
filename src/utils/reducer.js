export const initialState = {
    user: null
};

export const actionTypes = {
    SET_USER: "Set__User"
}

const reducer = (state, action) => {
    console.log(action);

};

export default reducer;