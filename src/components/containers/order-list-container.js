import React from 'react';
import { connect } from 'react-redux';
import styles from './order-list-container.less';
import { Row, Col, Pagination } from 'antd';
import SearchInput from '../views/searchInput';
import DatePicker from '../views/datePicker';
import { getOrderList, getExpressList } from '../../api/order-list-api';
import FilterPanel from '../views/filterPanel';
import OrderListTable from '../views/orderListTable';
import store from '../../store';
import { updateOrderListSearch, resetOrderListSearch, sendModalToggle, sendModalDataSource, expressInfoModalToggle } from '../../actions/order-list-actions';
import FactorySendModal from '../views/sendModal';
import ExpressInfoModal from '../views/expressInfoModal';

const OrderListContainer = React.createClass({

    componentDidMount() {
        this.commitSearch();
        getExpressList({});
    },
    
    updateSearch(key, value1) {
        if (key == 'commit') {
            return function () {
                this.commitSearch();
            }.bind(this);
        } else if (key == 'reset') {
            return function () {
                this.resetSearch();
            }.bind(this);
        } else if (value1 == undefined) {
            return function (value2) {
                var obj = {};
                obj[key] = value2;
                store.dispatch(updateOrderListSearch(obj));
            }
        } else {
            return function () {
                var obj = {};
                obj[key] = value1;
                store.dispatch(updateOrderListSearch(obj));
            }
        }
    },
    
    resetSearch() {
        store.dispatch(resetOrderListSearch());
        this.commitSearch();
    },
    
    commitSearch() {
        getOrderList({...store.getState().orderListSearchState})
    },
    
    checkboxClick(key) {
        if (key == 'single') {
            return function () {
                
            }.bind(this);
        } else if (key == 'all') {
            return function () {
                
            }.bind(this);
        }
    },

    closeModal() {
        store.dispatch(sendModalToggle());
    },
    
    closeExpressInfoModal() {
        store.dispatch(expressInfoModalToggle());
    },
    
    modalClick(info) {
        store.dispatch(sendModalToggle());
        store.dispatch(sendModalDataSource({ info : [info]}));
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
                            updateSearch={this.updateSearch}
                            style={{width : 284, marginLeft : 8, paddingTop : 10}} />
                        <DatePicker
                            updateSearch={this.updateSearch}/>
                    </Col>
                    <Col sm={4}></Col>
                    <Col sm={4} className={styles.lineHeight}>
                        <h1>{orderList.totalRows}</h1>
                        <span>订单总数</span>
                    </Col>
                </Row>

                <FilterPanel updateSearch={this.updateSearch} />
                
                <OrderListTable status={orderList.status} dataSourceList={orderList.info} total={orderList.totalRows} currentPage={orderList.currentPage} updateSearch={this.updateSearch} checkboxClick={this.checkboxClick} modalClick={this.modalClick} />
                
                <FactorySendModal closeModal={this.closeModal} />

                <ExpressInfoModal />
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        orderList : store.orderListState,
        searchState : store.orderListSearchState
    }
};

export default connect(mapStateToProps)(OrderListContainer);