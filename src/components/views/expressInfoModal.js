import React from 'react';
import { Row, Col, Modal, Steps } from 'antd';
import store from '../../store';
import { expressInfoModalToggle } from '../../actions/order-list-actions';
import { connect } from 'react-redux';
const Step = Steps.Step;

const ExpressInfoModal = React.createClass({
    
    hideModal() {
        store.dispatch(expressInfoModalToggle());
    },
    
    render() {
        let { visible, add_time, address, consignee, express_company, express_fee, express_sn, goods_info, info, mobile, record_sn, store_name, total_price } = this.props.state;
        let stepList = '';
        try {
            stepList = info.reverse().map(function (option) {
                return <Step title={option.time} description={option.status} />
            });
        } catch (e) {}
        return (
            <Modal width="600px" title="物流信息" visible={visible} onOk={this.hideModal} onCancel={this.hideModal} >
                <Row>
                    <Col style={{marginLeft : '42px'}}>
                        <h4>快递公司: {express_company}</h4>
                        <h4>运单编号: {express_sn}</h4>
                        <h4>运费(元): {express_fee}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Steps direction="vertical">
                            {stepList}
                        </Steps>
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