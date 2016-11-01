import React from 'react';
import { Form, Select, Modal, Row, Col, Icon, Input, message, InputNumber } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import ModalTableRow from './modalTableRow';
import store from '../../store';
import { sendModalDataSource} from '../../actions/order-list-actions';
import { factorySend, getOrderList } from '../../api/order-list-api';

let SendModal = React.createClass({

    handleSubmit(e) {
        if(e) e.preventDefault();
        
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return ;
            } else {
                let finalConfig = Object.assign({}, {...values});
                // console.log('原装的finalConfig', finalConfig);
                store.dispatch(sendModalDataSource({...finalConfig}));
                factorySend(store.getState().factorySendState, function () {
                    message.success('发货成功');
                    getOrderList({...store.getState().orderListSearchState});
                    this.hideModal();
                }.bind(this), function (info) {
                    message.error('发货失败!' + info.info);
                }.bind(this));
            }
        });
    },

    generateSum() {
        let generatedSum = [];
        let goodsView = {};
        let total = 0;
        this.props.factorySendState.info.forEach(function (option) {
            option.goods_info.forEach(function (option) {
                let atomGoods = {
                    goods_name : option.goods_name,
                    goods_num : option.goods_num,
                    goods_price : option.goods_price
                };
                total += option.goods_num * option.goods_price;
                generatedSum.push(atomGoods);
            })
        });
        for (let i = 0; i < generatedSum.length; i++) {
            if (!goodsView[generatedSum[i]['goods_name']]) {
                goodsView[generatedSum[i]['goods_name']] = generatedSum[i]['goods_num'];
            } else {
                goodsView[generatedSum[i]['goods_name']] += generatedSum[i]['goods_num'];
            }
        };
        goodsView['总价'] = total;
        // console.log(generatedSum, goodsView);
        return goodsView;
    },

    hideModal() {
        this.props.closeModal();
        this.props.form.resetFields();
        store.dispatch(sendModalDataSource({ selectedAll : false, info : []}));
    },

    express_sn(rule, value, callback) {
        try {
            if (/[a-zA-Z\d]{6,30}/.test(value)) {
                callback();
            } else {
                callback(['单号必须是6位以上的字母或数字']);
            }
        } catch (e) {
            callback(['填写有误']);
        }
    },

    express_fee(rule, value, callback) {
        try {
            if (parseFloat(value) >= 0) {
                callback();
            } else {
                callback(['不能输入负数'])
            }
        } catch (e) {
            callback(['填写有误']);
        }
    },

    render() {
        let { visible, info } = this.props.factorySendState;
        // visible = process.env.NODE_ENV !== 'production' ? true : visible;
        const infoSingle = info[0];
        const rowStyle = { height : '40px', lineHeight : '40px', background : '#f6f9fb', marginLeft : '-15px', marginRight : '-15px', marginBottom : '8px', marginTop : '8px'};
        const colStyle = { textAlign : 'center'};
        let addressCol = '';
        try {
            addressCol = (
                <Col>
                    <Icon style={{ color : 'red'}} type="fa fa fa-map-marker fa-3x" className="fixFontAwsome" />
                    &nbsp; 寄送至 &nbsp;
                    {infoSingle.address} &nbsp;
                    {infoSingle.store_name} &nbsp;
                    ({infoSingle.consignee} 收)
                    {infoSingle.mobile}
                </Col>
            )
        } catch (e) {}

        let rowList = [];
        for (let i = 0; i < info.length; i++) {
            rowList.push(
                <ModalTableRow dataSource={info[i]} />
            )
        }

        let totalCount = [];
        let result = this.generateSum();
        let n = 0;
        for (let key in result) {
            // console.log('key', key, 'result', result, result[key]);
            totalCount.push(
                <Col key={key}>{key} : {result[key]}</Col>
            );
            n++;
        }
        let height = n * 25 + 'px';

        const { getFieldDecorator } = this.props.form;
        let { expressList } = this.props;
        const formItemLayout = {
            labelCol : { span : 6},
            wrapperCol : { span : 18}
        };
        let selectOptions = '';
        try {
            selectOptions = expressList.map(function (item, index) {
                return <Option key={index} value={item}>{item}</Option>
            });
        } catch (e) {}

        return (
            <Modal width="800px" title="我要发货" visible={visible} onOk={this.handleSubmit} onCancel={this.hideModal} >
                <Row type="flex" align="middle" justify="center">
                    {addressCol}
                </Row>
                <Row style={rowStyle}>
                    <Col style={colStyle} span={14}>产品名称</Col>
                    <Col style={colStyle} span={5}>单价</Col>
                    <Col style={colStyle} span={5}>数量</Col>
                </Row>
                <Row>
                    <Col>
                        {rowList}
                    </Col>
                </Row>

                <Row style={{ borderTop : '1px solid #f7f7f7', borderBottom : '1px solid #f7f7f7', marginBottom : '10px'}}>
                    <Col sm={12}>
                        <Row style={{height : height}} type="flex" align="middle" justify="center">
                            <Col>合计:</Col>
                        </Row>
                    </Col>
                    <Col sm={12}>
                        <Row style={{height : height, display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
                            {totalCount}
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col/>
                </Row>
                <Row>
                    <Col>
                        <Form inline>
                            <FormItem
                                {...formItemLayout} style={{width : '360px'}}
                                hasFeedback label="物流公司">
                                {getFieldDecorator('express_company', {
                                    rules : [{ required : true, message : '请选择物流公司' }]
                                })(
                                    <Select
                                        showSearch
                                        style={{width : '268px'}}
                                    >
                                        {selectOptions}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} style={{width : '360px'}}
                                hasFeedback label="快递单号">
                                {getFieldDecorator('express_sn', {
                                    rules : [{ required : true, whitespace : true, message : '请输入快递单号' }, {validator : this.express_sn}]
                                })(
                                    <Input style={{width : '268px'}}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} style={{width : '360px'}}
                                hasFeedback label="运费(元)">
                                {getFieldDecorator('express_fee', {
                                    rules : [{ required : true, whitespace : true, message : '填写快递运费' }, {validator : this.express_fee}]
                                })(
                                    <Input style={{width : '268px'}} type="number"/>
                                )}
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <Row><Col/></Row>
            </Modal>
        )
    }
});

SendModal = createForm()(SendModal);

const mapStateToProps = function (store) {
    return {
        factorySendState : store.factorySendState,
        expressList : store.expressListState.info
    }
};

export default connect(mapStateToProps)(SendModal);