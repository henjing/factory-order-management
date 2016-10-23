import * as types from './action-types';

export function getOrderListSuccess(info) {
    
    return {
        type : types.GET_ORDER_LIST_SUCCESS,
        info
    }
}

export function resetGetOrderList(info) {
    
    return {
        type : types.RESET_GET_ORDER_LIST,
        info
    }
}

export function updateOrderListSearch(info) {
    
    return {
        type : types.UPDATE_SEARCH,
        info
    }
}

export function resetOrderListSearch() {
    
    return {
        type : types.RESET_SEARCH
    }
}

export function sendModalToggle() {
    
    return {
        type : types.FACTORY_MODAL_TOGGLE
    }
}

export function sendModalDataSource(info) {
    
    return {
        type : types.FACTORY_SEND_SELECTED,
        info
    }
}

export function getExpressListSuccess(info) {
    
    return {
        type : types.GET_EXPRESS_LIST_SUCCESS,
        info
    }
}

export function getExpressInfoSuccess(info) {
    
    return {
        type : types.GET_EXPRESS_INFO,
        info
    }
}

export function expressInfoModalToggle() {
    return {
        type : types.EXPRESS_INFO_MODAL_TOGGLE
    }
}