import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import orderListContainer from './components/containers/order-list-container';
import orderStatContainer from './components/containers/order-stat-container';

// Layouts
import MainLayout from './components/layouts/main-layout';
// Route base
import { routeBase } from './appConstants/urlConfig';


export default (
    <Router history={browserHistory}>
        <Route path={routeBase} component={MainLayout} >

            <IndexRedirect to={routeBase + 'order_list'} />
            <Route path={routeBase + 'order_list'} component={orderListContainer}></Route>
            
            <Route path={routeBase + 'order_stat'} component={orderStatContainer}></Route>
            
        </Route>
    </Router>
)
