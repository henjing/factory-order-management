import * as types from '../actions/action-types';

const initialState = {
    status : 'all',
    dateStart : '',
    dateEnd : '',
    search : '',
    timeLimit : '',
    page : 1,
    order : 'add_time_desc', // 'add_time_desc'时间降序,'add_time'时间升序,'store_name_desc'店铺名降序,'store_name'店铺名升序, 'send_time'发货时间升序,'send_time_desc'发货时间降序
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
                    order : 'add_time_desc',
                    page : 1,
                    no_page : false // 是否分页,默认为分页
            });
    }
    
    return state;
};

export default orderListSearchReducer;