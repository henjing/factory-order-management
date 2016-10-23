import * as types from '../actions/action-types';

const initialState = {
    visible : false,
    info : [],
    record_sns : '',
    express_company : '',
    express_sn : '',
    express_fee : '',
    selectedAll : false,
    
};

const factorySendReducer = function (state = initialState, action) {
    
    switch (action.type) {
        
        case types.FACTORY_MODAL_TOGGLE :
            return Object.assign({}, state, { visible : !state.visible});
        
        case types.FACTORY_SEND_SELECTED : 
            return Object.assign({}, state, {...action.info});
    }
    
    return state;
};

export default factorySendReducer;