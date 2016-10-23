import React from 'react';
import { Row, Col, Button, Icon, Badge } from 'antd';
import { connect } from 'react-redux';
import store from '../../store';
import { sendModalDataSource, resetOrderListSearch } from '../../actions/order-list-actions';

const FilterPanel = React.createClass({
    
    handleClick(key, value) {
        return function () {
            if (this.state.stayNight != value) {
                // 重置搜索条件
                store.dispatch(resetOrderListSearch());
                this.props.updateSearch(key, value)();
                
                if (this.state.stayNight == '0') {
                    console.log('执行selectedALl :false');
                    store.dispatch(sendModalDataSource({ selectedAll : false}));
                    store.dispatch(sendModalDataSource({ info :[] }));
                }

                setTimeout(function () {
                    this.props.updateSearch('commit')();
                }.bind(this), 1);

                setTimeout(function () {
                    this.setState({ stayNight : value});
                }.bind(this), 10);
            }
        }.bind(this);
    },

    getInitialState() {
        return {
            stayNight : 'all'
        }
    },
    
    render() {
        const { status } = this.props.searchState;
        const count = status == '0' ? {count : this.props.total} : {};
        return (
            <Row type="flex" align="middle" style={{ marginLeft : 88, height : 100 }}>
                <Col span={16} >
                    <Button onClick={this.handleClick('status', 'all')} type={status == 'all' ? 'primary' : ''} >全部订单</Button>
                    <Button onClick={this.handleClick('status', '1')} type={status == '1' || status == '2' ? 'primary' : ''} style={{marginLeft : 8}}>已发货订单</Button>
                    <Badge {...count}>
                        <Button onClick={this.handleClick('status', '0')} type={status == '0' ? 'primary' : ''} style={{marginLeft : 8}}>未发货订单</Button>
                    </Badge>
                </Col>
                <Col span={4}/>
                <Col span={4}>
                    <Row type="flex" align="middle" justify="center">
                        <Col>
                            <Button icon="download">导出列表</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        searchState : store.orderListSearchState,
        total : store.orderListState.totalRows
    }
};

export default connect(mapStateToProps)(FilterPanel);

