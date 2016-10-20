import { combineReducers } from 'redux';

// Reducers
import collapseReducer from './collapse-reducer';
import modifyPasswordReducer from './modify-password-reducer';
import adminReducer from './admin-reducer';
import orderListReducer from './order-list-reducer';

const reducers = combineReducers({
    collapseState : collapseReducer,
    modifyPasswordState : modifyPasswordReducer,
    adminState : adminReducer,
    orderListState : orderListReducer
});

export default reducers;