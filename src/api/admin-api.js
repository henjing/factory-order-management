import { getAdminUrl, modifyExpressNumUrl } from '../appConstants/urlConfig';
import commonAjax, { commonGetAjax } from '../helpers/commonAjax';
import { getAdminSuccess } from '../actions/admin-actions';
import store from '../store';

// get user auth and profile
export function getAdmin(config, sucCallback, failCallback) {
    return commonAjax(getAdminUrl, config, function (info) {
        store.dispatch(getAdminSuccess(info));
        if (sucCallback) sucCallback();
    }, failCallback);
}

export function modifyExpressSn(config, sucCallback, failCallback) {
    return commonAjax(modifyExpressNumUrl, config, function (info) {
        if (sucCallback) sucCallback(info);
    }, function (info) {
        if (failCallback) failCallback(info);
    })
}