import * as types from '../actions/action-types';

const initialState = {
    currentPage : 1,
    info : [],
    status : 0,
    totalPage : 1,
    totalRows : 0
};

// info : [{}], {}里面的字段有address, consignee, goods_info, mobile, record_sn, status, store_name, time等

const orderListReducer = function orderListReducer(state = initialState, action) {
    switch (action.type) {
        
        case types.GET_ORDER_LIST_SUCCESS :
            return Object.assign({}, state, {...action.info});
    }
    
    return state;
};

export default orderListReducer;