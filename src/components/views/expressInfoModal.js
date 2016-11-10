import React from 'react';
import { Row, Col, Modal, Steps, Input, Switch, Button, message, Timeline } from 'antd';
import store from '../../store';
import { expressInfoModalToggle } from '../../actions/order-list-actions';
import { connect } from 'react-redux';
import { modifyExpressSn } from '../../api/admin-api';
import { getOrderList } from '../../api/order-list-api';
const Step = Steps.Step;
const TimelineItem = Timeline.Item;

const ExpressInfoModal = React.createClass({
    
    hideModal() {
        store.dispatch(expressInfoModalToggle());
        this.setState({...this.getInitialState()});
    },
    componentWillUnmount() {
        this.setState({...this.getInitialState()});
    },
    getInitialState() {
        return {
            checked : false,
            value : '',
            name : '',
            price : ''
        }
    },
    onChange(checked) {
        this.setState({checked : checked});
    },
    onClick() {
        let config = {};
        if (this.state.value) {
            config['express_sn'] = this.state.value;
        } else {
            message.error('请输入新的物流单号');
            return;
        }
        if (this.state.name) {
            config['express_company'] = this.state.name;
        }
        if (this.state.price) {
            config['express_fee'] = this.state.price;
        }
        config['record_sn'] = this.props.state.record_sn;
        modifyExpressSn(config, function (info) {
            message.success(info.info);
            this.hideModal();
            getOrderList({...store.getState().orderListSearchState});
        }.bind(this), function (info) {
            message.error(info.info);
        }.bind(this));
    },
    onInputChange(e) {
        // console.log('value', value);
        this.setState({value : e.target.value});
    },
    onNameChange(e) {
        this.setState({name : e.target.value});
    },
    onPriceChange(e) {
        this.setState({price : e.target.value});
    },
    render() {
        let { visible, add_time, address, consignee, express_company, express_fee, express_sn, goods_info, info, mobile, record_sn, store_name, total_price } = this.props.state;
        let stepList = '';
        try {
            stepList = info.map(function (option) {
                // return <Step title={option.time} description={option.status} />
                return <TimelineItem>{option.status}{'  '}{option.time}</TimelineItem>
            });
        } catch (e) {}
        return (
            <Modal width="600px" title="物流信息" visible={visible} onOk={this.hideModal} onCancel={this.hideModal} >
                <Row>
                    <Col sm={12} style={{paddingLeft : '42px'}}>
                        <h4 style={{height : '30px', lineHeight : '30px'}}>物流公司: {express_company}</h4>
                        <h4 style={{height : '30px', lineHeight : '30px'}}>运单编号: {express_sn}</h4>
                        <h4 style={{height : '30px', lineHeight : '30px'}}>运费(元): {express_fee}</h4>
                    </Col>
                    <Col sm={12}>
                        <div style={{height : '30px', lineHeight : '30px'}}>修改单号&nbsp;&nbsp;
                            <Switch checked={this.state.checked} onChange={this.onChange} checkedChildren={'开'} unCheckedChildren={'关'} />
                        </div>
                        <div style={{height : '30px', lineHeight : '30px'}}>
                            <Input value={this.state.value} addonBefore="新物流单号"onChange={this.onInputChange} disabled={!this.state.checked}/>
                        </div>
                        <div style={{height : '30px', lineHeight : '30px'}}>
                            <Input value={this.state.name} addonBefore="新物流公司" placeholder="可不填" onChange={this.onNameChange} disabled={!this.state.checked}/>
                        </div>
                        <div style={{height : '30px', lineHeight : '30px'}}>
                            <Input value={this.state.price} type="number" addonBefore="新运费 (元)" placeholder="可不填" onChange={this.onPriceChange} disabled={!this.state.checked}/>
                        </div>
                        <div style={{height : '30px', lineHeight : '30px'}}>
                            <Button type="primary" onClick={this.onClick} disabled={!this.state.checked}>修改</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/*<Steps direction="vertical">
                            {stepList}
                        </Steps>*/}
                        <Timeline>
                            {stepList}
                        </Timeline>
                    </Col>
                </Row>
            </Modal>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        state : store.expressInfoState
    }
};

export default connect(mapStateToProps)(ExpressInfoModal);