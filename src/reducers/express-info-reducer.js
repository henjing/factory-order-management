import * as types from '../actions/action-types';

const initialState = {
    info : {
        express_sn : '',
        visible : false
    }
};

const expressInfoReducer = function (state = initialState, action) {
    
    switch (action.type) {
        case types.GET_EXPRESS_INFO :
            return Object.assign({}, state, {...action.info});
        
        case types.EXPRESS_INFO_MODAL_TOGGLE :
            return Object.assign({}, state, {visible : !state.visible});
    }
    
    return state;
};

export default expressInfoReducer;