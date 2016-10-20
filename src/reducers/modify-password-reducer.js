import * as types from '../actions/action-types';

const initialState = {
    visible : false
};

const modifyPasswordReducer = function (state = initialState, action) {
    
    switch (action.type) {
        
        case types.PASSWORD_MODAL_TOGGLE : 
            return Object.assign({}, state, { visible : !state.visible });
    }
    
    return state;
};

export default modifyPasswordReducer;

