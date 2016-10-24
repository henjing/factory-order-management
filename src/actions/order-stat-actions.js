import * as types from './action-types';

export function updateOrderStat(info){

    return {
        type : types.UPDATE_ORDER_STAT,
        info
    }
}

export function resetOrderStat(info){

    return {
        type : types.RESET_ORDER_STAT,
        info
    }
}

export function updateGoodsCategory(info) {

    return {
        type : types.UPDATE_GOODS_CATEGORY,
        info
    }
}

export function updateOrderStatSearch(info) {
    
    return {
        type : types.UPDATE_ORDER_STAT_SEARCH,
        info
    }
}

export function resetOrderStatSearch(info) {
    
    return {
        type : types.RESET_ORDER_STAT_SEARCH,
        info
    }
}