import React from 'react';
import { Row, Col, Checkbox, Button, Icon, Pagination, message } from 'antd';
import TableRow from './orderListTableRow';
import { connect } from 'react-redux';
import store from '../../store';
import { sendModalDataSource, sendModalToggle } from '../../actions/order-list-actions';

const OrderListTable = React.createClass({

    handleClick(page) {
        this.props.updateSearch('page', page)();
        this.props.updateSearch('commit')();
    },

    buttonClick() {
        if (this.props.sendState.info.length > 0) {
            if (this.isSameAddress()) {
                store.dispatch(sendModalToggle());
            } else {
                message.error('收货地址不一致,无法合并发货!');
            }
        } else {
            message.error('目前未选择任何订单');
        }
    },

    isSameAddress() {
        const addressList = this.props.sendState.info.map(function (option) {
            return option.address;
        });
        var temp = function () {
            for (let i = 1; i < addressList.length; i++) {
                if (addressList[i] !== addressList[0]) return false;
            }
            return true;
        };
        return temp();
    },
    
    onChange(e) {
        if (e.target.checked) {
            store.dispatch(sendModalDataSource({ selectedAll : true }));
        } else {
            store.dispatch(sendModalDataSource({ selectedAll : false}));
        }
    },

    render() {
        const { dataSourceList, total, currentPage, status } = this.props;
        const rowStyle = { height : '40px', lineHeight : '40px', background : '#f6f9fb', marginLeft : '-15px', marginRight : '-15px'};
        const colStyle = { textAlign : 'center'};

        let tableRowList = [];

        if (status == 0) {
            tableRowList = (
                <h1 style={{textAlign : 'center'}}>当前搜索条件下,结果为空,请尝试"重置搜索条件"按钮!</h1>
            )
        } else {
            for (let i = 0; i < dataSourceList.length; i++) {
                const dataSource = dataSourceList[i];
                tableRowList.push(
                    <TableRow
                        key={dataSource['record_sn']}
                        isSameAddress={this.isSameAddress}
                        modalClick={this.props.modalClick}
                        dataSource={dataSource}  />
                )
            }
        }
        const disabled = this.props.searchState.status == '1' || this.props.searchState.status == '2';
        const checked = this.props.sendState.selectedAll;
        const type = this.props.sendState.info.length > 0 ? {type : 'primary'} : {};

        return (
            <div>
                <Row style={rowStyle} >
                    <Col style={colStyle} span={5}>产品名称</Col>
                    <Col style={colStyle} span={3}>单价</Col>
                    <Col style={colStyle} span={3}>数量</Col>
                    <Col style={colStyle} span={4}>订单总价</Col>
                    <Col style={colStyle} span={5}>收货地址</Col>
                    <Col style={colStyle} span={4}>交易状态</Col>
                </Row>
                <Row>
                    <Col style={{ marginLeft : '7px', marginTop : '5px' }}>
                        <Checkbox onChange={this.onChange} checked={checked} disabled={disabled} >
                            <Button {...type} onClick={this.buttonClick} disabled={disabled}>
                                批量发货
                            </Button>
                        </Checkbox>
                    </Col>
                </Row>

                {tableRowList}

                <Row type="flex" align="middle" justify="center">
                    <Col>
                        <Pagination onChange={this.handleClick} defaultPageSize={5} total={total} current={parseInt(currentPage)}  />
                    </Col>
                </Row>
            </div>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        sendState : store.factorySendState,
        searchState : store.orderListSearchState
    }
};

export default connect(mapStateToProps)(OrderListTable);
