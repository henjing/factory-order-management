import React from 'react';
import { Form, Select, Modal, Row, Col, Icon, Input } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
import ModalTableRow from './modalTableRow';
import store from '../../store';
import { sendModalDataSource} from '../../actions/order-list-actions';
import { factorySend } from '../../api/order-list-api';

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
                factorySend(store.getState().factorySendState);
            }
        });
    },

    hideModal() {
        this.props.closeModal();
        this.props.form.resetFields();
    },

    render() {
        let { visible, info } = this.props.factorySendState;
        visible = process.env.NODE_ENV !== 'production' ? true : visible;
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
                    <Col style={colStyle} span={10}>产品名称</Col>
                    <Col style={colStyle} span={7}>单价</Col>
                    <Col style={colStyle} span={7}>数量</Col>
                </Row>
                <Row>
                    <Col>
                        {rowList}
                    </Col>
                </Row>

                <Row>
                    <Col/>
                </Row>
                <Row>
                    <Col>
                        <Form inline onSubmit={this.test}>
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
                                    rules : [{ required : true, message : '请输入快递单号' }]
                                })(
                                    <Input style={{width : '268px'}}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout} style={{width : '360px'}}
                                hasFeedback label="运费(元)">
                                {getFieldDecorator('express_fee', {
                                    rules : [{ required : true, message : '填写快递运费' }]
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