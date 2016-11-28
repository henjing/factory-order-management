import React from 'react';
import { connect } from 'react-redux';
import styles from '../../app.less';
import { Row, Col, Table, message, Button } from 'antd';
import SearchInput from '../views/order-stat-searchInput';
import DatePicker from '../views/order-stat-datePicker';
import FilterPanel from '../views/order-stat-filterPanel';
import store from '../../store';
import { updateOrderStatSearch, resetOrderStatSearch} from '../../actions/order-stat-actions';
import { getExpressInfoSuccess, expressInfoModalToggle } from '../../actions/order-list-actions';
import { getOrderStatList, getGoodsCategoryList } from '../../api/order-stat-api';
import { getExpressInfo } from '../../api/order-list-api';
import ExpressInfoModal from '../views/expressInfoModal';

const OrderStatContainer = React.createClass({

    componentDidMount() {
        getOrderStatList({...this.props.searchState});
        // getGoodsCategoryList();
    },

    getInitialState() {
        return {
            isSpin : false
        }
    },

    expressClick(record) {
        return function () {
            this.setState({ isSpin : true });
            store.dispatch(expressInfoModalToggle());
            let express_sn = record.express_sn;
            store.dispatch(getExpressInfoSuccess({...record}));
            getExpressInfo({express_sn : express_sn}, function () {
                this.setState({ isSpin : false });
                // store.dispatch(expressInfoModalToggle());
            }.bind(this), function (info) {
                this.setState({ isSpin : false });
                // message.error(info.info);
                store.dispatch(getExpressInfoSuccess({info : []}));
            }.bind(this));
        }.bind(this);
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
                store.dispatch(updateOrderStatSearch(obj));
            }
        } else {
            return function () {
                var obj = {};
                obj[key] = value1;
                store.dispatch(updateOrderStatSearch(obj));
            }
        }
    },
    
    resetSearch() {
        store.dispatch(resetOrderStatSearch());
        this.commitSearch();
    },
    
    commitSearch() {
        getOrderStatList({...store.getState().orderStatSearchState})
    },

    handleClick(page) {
        this.updateSearch('page', page)();
        this.updateSearch('commit')();
    },

    render() {
        const { orderStat, goodsCategory } = this.props.orderStat;
        let locale = {filterConfirm: '确定', filterReset: '重置', emptyText: '在该搜索条件下暂无数据,请点击"重置搜索条件"试试!'};
        const pagination = {
            current : parseInt(orderStat.currentPage),
            total : orderStat.totalRows,
            onChange : function (page) {
                // console.log('page', page);
                this.handleClick(page);
            }.bind(this),
            defaultPageSize : 10
        };
        const columns = [{
            title : '发货时间',
            dataIndex : 'send_time',
            key : 'send_time',
            className : 'textCenter'
        }, {
            title : '快递单号',
            key : 'express_sn',
            className : 'textCenter',
            render : function (text, record, index) {
                return (
                    <Col>
                        <p>{record.express_company}</p>
                        <p>{record.express_sn}</p>
                    </Col>
                )
            }
        }, {
            title : '运费(元)',
            dataIndex : 'express_fee',
            key : 'express_fee',
            className : 'textRight'
        }, {
            title : '订单编号',
            key : 'record_sn',
            className : 'textCenter',
            render : function (text, record, index) {
                return (
                    <Col>
                        {record.order_info.map(function (option) {
                            return (<Col>{option.record_sn}</Col>)
                        })}
                    </Col>
                )
            }
        }, {
            title : '购买产品',
            key : 'goods_name',
            className : 'textCenter',
            render : function (text, record, index) {
                return (
                    <Col>
                        {record.order_info.map(function (option) {
                            return (<p>{option.goods_name}</p>)
                        })}
                    </Col>
                )
            }
        }, {
            title : '购买数量',
            key : 'goods_num',
            className : 'textCenter',
            render : function (text, record, index) {
                return (
                    <Col>
                        {record.order_info.map(function (option) {
                            return (<p>{option.goods_num}</p>)
                        })}
                    </Col>
                )
            }
        }, {
            title : '社区空店',
            key : 'store_name',
            dataIndex : 'store_name',
            className : 'textCenter'
        }, {
            title : '收货地址',
            key : 'address',
            className : 'textCenter',
            render : function (text, record, index) {
                return (
                    <Col>
                        <p>{record.consignee + ' ' + record.mobile}</p>
                        <p>{record.address}</p>
                    </Col>
                )
            }
        }, {
            title : '物流详情',
            // key : 'express_sn',
            className : 'textCenter',
            render : function (text, record, index) {
                return (
                    <Col>
                        <Button onClick={this.expressClick(record)}>点击查看</Button>
                    </Col>
                )
            }.bind(this)
        }];

        const isSpin = this.state.isSpin;
        return (
            <div className="container-fluid">
                <Row>
                    <Col sm={16}>
                        <span className="spanWidth lineHeight">搜索:</span>
                        <SearchInput
                            placeholder="快递单号,收货人姓名,店铺名,手机号或订单号"
                            updateSearch={this.updateSearch}
                            style={{width : 284, marginLeft : 8, paddingTop : 10}} />
                        <DatePicker
                            updateSearch={this.updateSearch}/>
                    </Col>
                    <Col sm={4} />
                    <Col sm={4} className={styles.lineHeight}>
                        <h1>{orderStat.totalRows}</h1>
                        <span>运单总数</span>
                    </Col>
                </Row>

                <FilterPanel updateSearch={this.updateSearch} />
                
                <Table style={{marginLeft : '-15px', marginRight : '-15px'}} loading={isSpin} rowClssName="textCenter" locale={locale} bordered pagination={pagination} dataSource={orderStat.info} columns={columns} />

                <ExpressInfoModal />
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        orderStat : store.orderStatState,
        searchState : store.orderStatSearchState
    }
};

export default connect(mapStateToProps)(OrderStatContainer);