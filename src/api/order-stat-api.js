import { getExpressedOrderUrl, getGoodsCategoryUrl } from '../appConstants/urlConfig';
import commonAjax, { commonGetAjax} from '../helpers/commonAjax';
import store from '../store';
import { updateGoodsCategory, updateOrderStat, resetOrderStat } from '../actions/order-stat-actions';

export function getOrderStatList(config, sucCallback, failCallback) {
    return commonAjax(getExpressedOrderUrl, config, function (info) {
        store.dispatch(updateOrderStat(info));
        if (sucCallback) sucCallback();
    }, function (info) {
        store.dispatch(resetOrderStat());
        if (failCallback) failCallback();
    });
}

export function getGoodsCategoryList(config, sucCallback, failCallback) {
    return commonGetAjax(getGoodsCategoryUrl, config, function (info) {
        store.dispatch(updateGoodsCategory(info));
        if (sucCallback) sucCallback();
    }, function (info) {
        store.dispatch(updateGoodsCategory(Object.assign({}, info, {info : []})));
        if (failCallback) failCallback();
    });
}
