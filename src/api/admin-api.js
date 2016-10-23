import { getAdminUrl } from '../appConstants/urlConfig';
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