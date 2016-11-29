import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, hashHistory } from 'react-router';
import orderListContainer from './components/containers/order-list-container';
import orderStatContainer from './components/containers/order-stat-container';

// 发货操作第二版
import orderListContainerV2 from './components/containers/order-list-container-v2';

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
// 已结算订单
import BalancedOrderContainer from './components/containers/balance-order-container';
// 待审核订单
import applyAppendContainer from './components/containers/apply-append-container';
// 待付款订单
import payAppendContainer from './components/containers/pay-append-container';
// 已付款订单
import paySuccessContainer from './components/containers/pay-success-container';
// 已驳回订单
import applyDenyContainer from './components/containers/apply-deny-container';

export default (
    <Router history={hashHistory}>
        <Route path={routeBase} component={MainLayout} >

            <IndexRedirect to={routeBase + 'order_list_v2'} />
            <Route breadcrumbName="订单管理" path={routeBase + 'order_list'} component={orderListContainer}>
            </Route>

            <Route breadcrumbName="订单管理v2" path={routeBase + 'order_list_v2'} component={orderListContainerV2}>
            </Route>
            
            <Route breadcrumbName="发货记录" path={routeBase + 'order_stat'} component={orderStatContainer}>
            </Route>

            <Route breadcrumbName="提现申请" path={routeBase + 'cashier'} component={CashierApplicationContainer}>
            </Route>

            <Route breadcrumbName="未结算订单" path={routeBase + 'not_yet_balance'} component={NotYetBalanceOrderContainer}>
            </Route>
            
            <Route breadcrumbName="已结算订单" path={routeBase + 'balance_order'} component={BalancedOrderContainer}>
            </Route>
            
            <Route breadcrumbName="待审核订单" path={routeBase + 'apply_append'} component={applyAppendContainer}>
            </Route>
            
            <Route breadcrumbName="待付款订单" path={routeBase + 'pay_append'} component={payAppendContainer}>
            </Route>
            
            <Route breadcrumbName="已付款订单" path={routeBase + 'pay_success'} component={paySuccessContainer}>
            </Route>
            
            <Route breadcrumbName="已驳回订单" path={routeBase + 'apply_deny'} component={applyDenyContainer}>
            </Route>
            
            <Route breadcrumbName="结算用模板" path={routeBase + 'template'} component={CashierTemplate}>
            </Route>
        </Route>
    </Router>
)
