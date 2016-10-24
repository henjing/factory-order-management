import * as types from '../actions/action-types';

const initialState = {
    orderStat : {
        currentPage : 1,
        info : [],
        status : 1,
        totalPage : 1,
        totalRows : 0
    },
    goodsCategory : {
        info : [],
        status : 1
    }
};

const orderStatReducer = function (state = initialState, action) {

    switch (action.type) {
        
        case types.UPDATE_ORDER_STAT : 
            return Object.assign({}, state, {orderStat : {...action.info}});
        
        case types.UPDATE_GOODS_CATEGORY :
            return Object.assign({} ,state, {goodsCategory : {...action.info}});
        
        case types.RESET_ORDER_STAT : 
            return Object.assign({}, state, {orderStat : {...initialState.orderStat}});
    }

    return state;
};

export default orderStatReducer;