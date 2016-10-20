import * as types from '../actions/action-types';

export function getAdminSuccess(info) {

    return {
        type : types.GET_ADMIN_SUCCESS,
        info
    };
}

export function passwordModalToggle() {
    
    return {
        type : types.PASSWORD_MODAL_TOGGLE
    }
}
