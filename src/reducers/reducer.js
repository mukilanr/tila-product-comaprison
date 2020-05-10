import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedProducts: [],
    featuresList: [],
    compareSummary: [],
    initialProducts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA:
            return {
                ...state,
                compareSummary: action.payload.products.compareSummary,
                featuresList: action.payload.products.featuresList,
                initialProducts: action.initialProducts
            }
        case actionTypes.SELECTED_PRODUCTS:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, action.payload]
            }
        case actionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                selectedProducts: action.payload
            }
        default:
            return state;
    }
};

export default reducer;