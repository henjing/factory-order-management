import React from 'react';
import { Row, Col, Button, Icon, Badge } from 'antd';
import { connect } from 'react-redux';
import store from '../../store';
import { sendModalDataSource, resetOrderListSearch } from '../../actions/order-list-actions';
import { getOrderListFileUrl } from '../../appConstants/urlConfig';

const FilterPanel = React.createClass({
    
    handleClick(key, value) {
        return function () {
            if (this.state.stayNight != value) {
                // 重置搜索条件
                store.dispatch(resetOrderListSearch());
                this.props.updateSearch(key, value)();
                
                // if (this.state.stayNight == '0') {
                if (true) {
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
        const {  downloadStatus, searchState } = this.props;
        const count = status == '0' ? {count : this.props.total} : {};

        let inputGroup = [];
        let finalInputGroup = '';
        let disabled = true;
        for (let i in searchState) {
            if (searchState[i]) {
                inputGroup.push(
                    <input type="hidden" name={i} value={searchState[i]} />
                )
            }
        }
        inputGroup.push(
            <input type="hidden" name="no_page" value="true" />
        );
        if (downloadStatus != 0) {
            finalInputGroup = inputGroup;
            disabled = false;
        };

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
                            <form action={getOrderListFileUrl} style={{display : 'inline-block'}}>
                                {finalInputGroup}
                                <Button disabled={disabled} htmlType="submit" icon="download">导出列表</Button>
                            </form>

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
        total : store.orderListState.totalRows,
        downloadStatus : store.orderListState.info.length
    }
};

export default connect(mapStateToProps)(FilterPanel);

