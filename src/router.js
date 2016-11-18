import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, hashHistory } from 'react-router';
import orderListContainer from './components/containers/order-list-container';
import orderStatContainer from './components/containers/order-stat-container';

// Layouts
import MainLayout from './components/layouts/main-layout';
// Route base
import { routeBase } from './appConstants/urlConfig';
// 厂商提现申请页面
import CashierApplicationContainer from './components/containers/cashier-application-container';
// 提现管理模板
import CashierTemplate from './components/containers/cashier-template';
// 未结算订单
import NotYetBalanceOrderContainer from './components/containers/notyet-balance-order-container';

export default (
    <Router history={hashHistory}>
        <Route path={routeBase} component={MainLayout} >

            <IndexRedirect to={routeBase + 'order_list'} />
            <Route breadcrumbName="订单管理" path={routeBase + 'order_list'} component={orderListContainer}>
            </Route>
            
            <Route breadcrumbName="发货记录" path={routeBase + 'order_stat'} component={orderStatContainer}>
            </Route>

            <Route breadcrumbName="提现申请" path={routeBase + 'cashier'} component={CashierApplicationContainer}>
            </Route>

            <Route breadcrumbName="未结算订单" path={routeBase + 'not_yet_balance'} component={NotYetBalanceOrderContainer}>
            </Route>
            
            <Route breadcrumbName="结算用模板" path={routeBase + 'template'} component={CashierTemplate}>
            </Route>
        </Route>
    </Router>
)
