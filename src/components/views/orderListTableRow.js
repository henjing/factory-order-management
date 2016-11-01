import React from 'react';
import { Row, Col, Checkbox, Icon, Button, message } from 'antd';
import store from '../../store';
import { getExpressInfoSuccess, expressInfoModalToggle, sendModalDataSource, sendModalToggle } from '../../actions/order-list-actions';
import { getExpressInfo } from '../../api/order-list-api';
import { connect } from 'react-redux';
import _ from 'lodash';

const OrderListTableRow = React.createClass({

    sendModalClick(dataSource) {
        return function () {
            // store.dispatch(sendModalDataSource({ selectedAll : false}));
            // setTimeout(function () {
            //     this.onChange(dataSource)({target : { checked : true }});
            //     store.dispatch(sendModalToggle());
            // }.bind(this), 80);
            // if (this.props.isSameAddress()) {
            //     store.dispatch(sendModalToggle());
            // } else {
            //     message.error('收货地址不一致,无法合并发货!');
            // }
            store.dispatch(sendModalDataSource({ info : [dataSource] }));
            store.dispatch(sendModalToggle());
        }.bind(this);
    },

    getInitialState() {
        return {
            selected : false
        }
    },

    infoModalClick(dataSource) {
        return function () {
            let express_sn = dataSource.express_sn;
            store.dispatch(getExpressInfoSuccess({...dataSource}));
            this.props.openSpin();
            getExpressInfo({express_sn : express_sn}, function () {
                store.dispatch(expressInfoModalToggle());
                this.props.closeSpin();
            }.bind(this), function (info) {
                message.error(info.info);
                this.props.closeSpin();
            }.bind(this));
        }.bind(this);
    },

    componentWillReceiveProps(nextProps) {
        // console.log('开始时并不执行 ');
        if (nextProps.searchState.status == '0') {
            if (nextProps.sendState.selectedAll != this.props.sendState.selectedAll) {
            // if (true) {
                // console.log('这一句就不会输出');
                if (nextProps.sendState.selectedAll) {
                    // console.log('可疑', this.props.dataSource);
                    // console.log('nextProps', nextProps.dataSource);
                    this.onChange(nextProps.dataSource)({target : { checked : true }});
                    this.setState({selected : true});
                } else {
                    this.onChange(nextProps.dataSource)({target : { checked : false }});
                    this.setState({selected : false});
                }
            }
        }
    },

    onChange(dataSource) {
        return function (e) {
            // console.log('datasource clicked');
            if (e.target.checked) {
                // if (this.props.searchState.status == '0') {
                if (dataSource.status == '0') {
                    // console.log('status', this.props.searchState.status);
                    if (dataSource.status == '0') {
                        const record_sn_List = this.props.sendState.info.map(function (option) {
                            return option.record_sn;
                        });
                        console.log('record_sn_list', record_sn_List);
                        const index = _.findIndex(record_sn_List, function (o) {
                            return o == dataSource.record_sn;
                        });
                        console.log('index for open!!', index);
                        if (index == -1 ) {
                            console.log('info!!!!', this.props.sendState.info);
                            let info = this.props.sendState.info;
                            // let info = Object.assign({}, this.props.sendState.info);
                            // console.log('info永远都是空数组???', info);
                            info.push(dataSource);
                            // console.log('final info', info);
                            store.dispatch(sendModalDataSource({ info :info }));
                            this.setState({selected : true});
                        }
                    }
                }
            } else {
                console.log('有执行吗');
                const record_sn_List = this.props.sendState.info.map(function (option) {
                    return option.record_sn;
                });
                console.log('record_sn_list', record_sn_List);
                const index = _.findIndex(record_sn_List, function (o) {
                    return o == dataSource.record_sn;
                });
                console.log('index for close', index);
                if (index != -1) {
                    let info = this.props.sendState.info;
                    info.splice(index, 1);
                    store.dispatch(sendModalDataSource({ info : info}));
                    this.setState({selected : false});
                    console.log('length', this.props.sendState.info.length);
                    if (this.props.sendState.info.length == 0) {
                        store.dispatch(sendModalDataSource({ selectedAll : false}));
                    }
                }
            }
        }.bind(this);
    },

    render() {
        const { dataSource } = this.props;
        let length = 0;
        try { length = dataSource.goods_info.length } catch (e) {}
        let colList = [];
        const rowStyle = { height : '40px', lineHeight : '40px', background : '#f7f7f7', marginLeft : '-15px', marginRight : '-15px'};
        const height = 120 * length + 'px';
        let i = 0;

        while (length > 0) {
            let colSource = dataSource.goods_info[i];
            colList.push(
                <Col style={{height : '120px', lineHeight : '120px'}}>
                    <Row>
                        <Col style={{width : 5 / 11 * 100 + '%', display : 'inline-block'}}>
                            <img src={colSource.goods_img} style={{width: '80px', height: '80px', borderRadius : '6px'}} />
                            &nbsp;
                            <span style={{width : '80px', overflow : 'hidden', textOverflow : 'ellipsis', whiteSpace : 'nowrap'}}>
                                {colSource.goods_name}
                            </span>
                        </Col>
                        <Col style={{width : 3 / 11 * 100 + '%', display : 'inline-block'}}>
                            {colSource.goods_price}
                        </Col>
                        <Col style={{width : 3 / 11 * 100 + '%', display : 'inline-block'}}>
                            {colSource.goods_num}
                        </Col>
                    </Row>
                </Col>
            );
            i++;
            length--;
        };

        // const checked = this.state.selected;
        const checked = (function () {
            if (this.props.dataSource.status == '0') {
                const record_sn_List = this.props.sendState.info.map(function (option) {
                    return option.record_sn;
                });
                const index = _.findIndex(record_sn_List, function (o) {
                    return o == this.props.dataSource.record_sn;
                }.bind(this));
                const ischecked = (index != -1);
                return ischecked;
            } else {
                return false;
            }

        }.bind(this))();
        // const disabled = this.props.searchState.status != '0';
        const isSend = this.props.dataSource.status != '0';
        const checkboxInsideOrOutside = isSend ? (
            <Col style={{marginLeft : '22px'}}>
                <Checkbox checked={checked} disabled={isSend} onChange={this.onChange(dataSource)} >
                </Checkbox>
                    &nbsp; {dataSource.add_time} &nbsp;
                    订单号: {dataSource.record_sn} &nbsp;
                    <Icon style={{color : 'red'}} type="home" /> &nbsp;
                    {dataSource.store_name}
            </Col>
        ) : (
            <Col style={{marginLeft : '22px'}}>
                <Checkbox checked={checked} disabled={isSend} onChange={this.onChange(dataSource)} >
                    {dataSource.add_time} &nbsp;
                    订单号: {dataSource.record_sn} &nbsp;
                    <Icon style={{color : 'red'}} type="home" /> &nbsp;
                    {dataSource.store_name}
                </Checkbox>
            </Col>
        );

        return (
            <div>
                <Row style={rowStyle}>
                    {checkboxInsideOrOutside}
                </Row>
                <Row style={{textAlign : 'center', marginLeft : '-15px', marginRight : '-15px'}}>
                    <Col span={11}>
                        <Row>
                            {colList}
                        </Row>
                    </Col>
                    <Col style={{ height : height, lineHeight : height }} span={4}>
                        {dataSource.total_price}
                    </Col>
                    <Col style={{ height : height, display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'center' }} span={5}>
                        <p>{dataSource.consignee}</p>
                        <p>{dataSource.mobile}</p>
                        <p>{dataSource.address}</p>
                    </Col>
                    <Col style={{ height : height, display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'center' }} span={4}>
                        <p style={{marginBottom : '5px'}}>
                            <Button disabled={isSend} onClick={this.sendModalClick(dataSource)}>单独发货</Button>
                        </p>
                        <p>
                            <Button onClick={this.infoModalClick(dataSource)} disabled={dataSource.status == '0' }>物流信息</Button>
                        </p>
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

export default connect(mapStateToProps)(OrderListTableRow);