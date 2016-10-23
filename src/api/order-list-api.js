import { getOrderListUrl, factorySendUrl, expressDetailUrl, expressListUrl } from '../appConstants/urlConfig';
import commonAjax, { commonGetAjax} from '../helpers/commonAjax';
import store from '../store';
import { getOrderListSuccess, getExpressListSuccess, getExpressInfoSuccess, resetGetOrderList } from '../actions/order-list-actions';

export function getOrderList(config, sucCallback, failCallback) {
    return commonAjax(getOrderListUrl, config, function (info) {
        store.dispatch(getOrderListSuccess(info));
        if (sucCallback) sucCallback();
    }, function (info) {
        store.dispatch(resetGetOrderList(info));
        if (failCallback) failCallback();
    });
}

export function factorySend(config, sucCallback, failCallback) {
    return commonAjax(factorySendUrl, factorySendConfig(config), function (info) {

        if (sucCallback) sucCallback();
    }, function (info) {
        if (failCallback) failCallback();
    });
}

export function getExpressInfo(config, sucCallback, failCallback) {
    return commonAjax(expressDetailUrl, config, function (info) {
        store.dispatch(getExpressInfoSuccess(info));
        if (sucCallback) sucCallback();
    }, function (info) {
        if (failCallback) failCallback();
    });
}

export function getExpressList(config, sucCallback, failCallback) {
    return commonAjax(expressListUrl, config, function (info) {
        store.dispatch(getExpressListSuccess(info));
        if (sucCallback) sucCallback();
    }, function (info) {
        if (failCallback) failCallback();
    });
}

function factorySendConfig(config) {
    var record_sns = '';
    var finalConfig = {};
    for (let i = 0; i < config.info.length; i++) {
        let record_sn = config.info[i].record_sn;
        record_sns = record_sns + record_sn + ',';
    }
    finalConfig['record_sns'] = record_sns;
    finalConfig['express_company'] = config['express_company'];
    finalConfig['express_sn'] = config['express_sn'];
    finalConfig['express_fee'] = config['express_fee'];
    return finalConfig;
}

