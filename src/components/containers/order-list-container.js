import React from 'react';
import { connect } from 'react-redux';
import styles from './order-list-container.less';
import { Row, Col } from 'antd';
import SearchInput from '../views/searchInput';
import DatePicker from '../views/datePicker';
import { getOrderList } from '../../api/order-list-api';
import FilterPanel from '../views/filterPanel';
import OrderListTable from '../views/orderListTable';

const OrderListContainer = React.createClass({

    componentDidMount() {
        getOrderList({});
    },

    render() {
        const { orderList } = this.props;
        return (
            <div className="container-fluid">
                <Row>
                    <Col sm={16}>
                        <span className="spanWidth lineHeight">搜索:</span>
                        <SearchInput
                            placeholder="请输入名字,手机号或订单号"
                            style={{width : 284, marginLeft : 8, paddingTop : 10}} />
                        <DatePicker />
                    </Col>
                    <Col sm={4} className={styles.lineHeight}>
                        <h1>{orderList.totalRows}</h1>
                        <span>今日新增订单</span>
                    </Col>
                    <Col sm={4} className={styles.lineHeight}>
                        <h1>{orderList.totalRows}</h1>
                        <span>订单总数</span>
                    </Col>
                </Row>

                <FilterPanel />
                <OrderListTable />
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        orderList : store.orderListState
    }
};

export default connect(mapStateToProps)(OrderListContainer);