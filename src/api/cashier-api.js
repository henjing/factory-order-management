import { getFactoryCashierUrl, getFactoryAccountOverviewUrl } from '../appConstants/urlConfig';
import commonAjax, { commonGetAjax} from '../helpers/commonAjax';
import store from '../store';
import { getOrderListSuccess, getExpressListSuccess, getExpressInfoSuccess, resetGetOrderList } from '../actions/order-list-actions';

export function cashierOverview(config, sucCallback, failCallback) {
    return commonGetAjax(getFactoryAccountOverviewUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    });
}

export function cashierSubmitApplication(config, sucCallback, failCallback) {
    return commonGetAjax(getFactoryCashierUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    });
}
