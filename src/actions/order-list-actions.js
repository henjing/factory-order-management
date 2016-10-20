import * as types from './action-types';

export function getOrderListSuccess(info) {
    
    return {
        type : types.GET_ORDER_LIST_SUCCESS,
        info
    }
}