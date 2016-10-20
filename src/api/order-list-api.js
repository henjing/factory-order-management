import { getOrderListUrl } from '../appConstants/urlConfig';
import commonAjax, { commonGetAjax} from '../helpers/commonAjax';
import store from '../store';
import { getOrderListSuccess } from '../actions/order-list-actions';

export function getOrderList(config, sucCallback, failCallback) {
    return commonGetAjax(getOrderListUrl, config, function (info) {
        store.dispatch(getOrderListSuccess(info));
        if (sucCallback) sucCallback();
    }, failCallback);
}


