import { combineReducers } from 'redux';

// Reducers
import collapseReducer from './collapse-reducer';
import modifyPasswordReducer from './modify-password-reducer';
import adminReducer from './admin-reducer';
import orderListReducer from './order-list-reducer';
import orderListSearchReducer from './order-list-search-reducer';
import factorySendReducer from './factory-send-reducer';
import expressListReducer from './express-list-reducer';
import expressInfoReducer from './express-info-reducer';
import orderStatReducer from './order-stat-reducer';
import orderStatSearchReducer from './order-stat-search-reducer';

const reducers = combineReducers({
    collapseState : collapseReducer,
    modifyPasswordState : modifyPasswordReducer,
    adminState : adminReducer,
    orderListState : orderListReducer,
    orderListSearchState : orderListSearchReducer,
    factorySendState : factorySendReducer,
    expressListState : expressListReducer,
    expressInfoState : expressInfoReducer,
    orderStatState : orderStatReducer,
    orderStatSearchState : orderStatSearchReducer
});

export default reducers;