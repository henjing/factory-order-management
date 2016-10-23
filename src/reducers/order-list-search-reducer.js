import * as types from '../actions/action-types';

const initialState = {
    status : 'all',
    dateStart : '',
    dateEnd : '',
    search : '',
    timeLimit : '',
    page : 1,
    no_page : false // 是否分页,默认为分页
};

const orderListSearchReducer = function (state = initialState, action) {
    
    switch (action.type) {
        case types.UPDATE_SEARCH :
            return Object.assign({}, state, {...action.info});
        
        case types.RESET_SEARCH : 
            return Object.assign({}, state, {
                    dateStart : '',
                    dateEnd : '',
                    search : '',
                    timeLimit : '',
                    page : 1,
                    no_page : false // 是否分页,默认为分页
            });
    }
    
    return state;
};

export default orderListSearchReducer;