import React from 'react';
import { cashierOverview, cashierSubmitApplication } from '../../api/cashier-api';
import { Row, Col, Button, Popconfirm, message } from 'antd';
import { hashHistory } from 'react-router';

const CashierApplicationContainer = React.createClass({
    componentDidMount() {
        cashierOverview({}, function (info) {
            this.setState({...info.info});
        }.bind(this), function (info) {
            message.error(info.info);
        }.bind(this));
    },
    getInitialState() {
        return {
            total_counted : 0, // 已结算
            total_price : 0, // 未结算金额
            total_wait_account : 0, // 未结算
        }
    },
    routeClick() {
        hashHistory.push('/cashier/balance');
    },
    submitCashier() {
        cashierSubmitApplication({}, function (info) {
            message.success(info.info);
            this.componentDidMount();
        }.bind(this), function (info) {
            message.error(info.info);
        })
    },
    render() {
        const cashierButton = this.state.total_price >= 10000 ? (
            <Button className="btn-warning">申请提现</Button>
        ) : (
            <Button className="btn-warning">申请提现</Button>
        );
        // <Button disabled>金额未达到10000元,无法申请提现</Button>
        return this.props.children || (
            <Row style={{borderBottom : '1px solid #f4f4f5'}}>
                <Col sm={12}>
                    <div style={{paddingLeft : '20px', paddingTop : '8px'}}>产品订单:</div>
                    <Row type="flex" align="middle" justify="space-around" style={{height : '120px'}}>
                        <Col style={{textAlign : 'center'}}>
                            <h2>{this.state.total_counted}</h2>
                            <p>已结算</p>
                        </Col>
                        <Col style={{textAlign : 'center'}}>
                            <h2>{this.state.total_wait_account}</h2>
                            <p>未结算</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign : 'center', paddingBottom : '16px'}}>
                            {/*<Button onClick={this.routeClick} type="primary">订单列表</Button>*/}
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} style={{borderLeft : '1px solid #f4f4f5'}}>
                    <div style={{paddingLeft : '20px', paddingTop : '8px', height : '26px'}}></div>
                    <Row type="flex" align="middle" justify="center" style={{height : '120px', flexDirection : 'column'}}>
                        <Col style={{textAlign : 'center'}}>
                            <h2>{this.state.total_price} <span style={{fontSize : '12px'}}>元</span></h2>
                            <p>目前未结算总金额</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign : 'center', paddingBottom : '16px'}}>
                            <Popconfirm placement="bottom" title="请确认提现操作" okText="确认" cancelText="取消" onConfirm={this.submitCashier}>
                                {cashierButton}
                            </Popconfirm>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
});

export default CashierApplicationContainer;