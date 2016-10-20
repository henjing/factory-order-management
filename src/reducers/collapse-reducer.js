import * as types from '../actions/action-types';

const initialState = { collapse : false };

const collapseReducer = function (state = initialState, action) {
    
    switch (action.type) {
        
        case types.COLLAPSE :
            return { collapse : !state.collapse };
    }
    
    return state;
};

export default collapseReducer;