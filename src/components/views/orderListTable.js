import React from 'react';
import { Row, Col, Checkbox, Button, Icon } from 'antd';

const OrderListTable = React.createClass({
    render() {
        const rowStyle = { height : '40px', lineHeight : '40px', background : '#f6f9fb', marginLeft : '-15px', marginRight : '-15px'};
        const colStyle = { textAlign : 'center'};
        const colCaptionStyle = { marginLeft : '22px'};
        const rowCaptionStyle = { height : '40px', lineHeight : '40px', background : '#f6f9fb'};
        return (
            <Row style={rowStyle} >
                <Col style={colStyle} span={5}>产品名称</Col>
                <Col style={colStyle} span={3}>单价</Col>
                <Col style={colStyle} span={3}>数量</Col>
                <Col style={colStyle} span={4}>订单总价</Col>
                <Col style={colStyle} span={5}>收货地址</Col>
                <Col style={colStyle} span={4}>交易状态</Col>
                <Row>
                    <Col style={colCaptionStyle}>
                        <Checkbox><Button>批量发货</Button></Checkbox>
                    </Col>
                </Row>
                <Row style={rowCaptionStyle}>
                    <Col style={colCaptionStyle}>
                        <Checkbox>
                            2016-05-17 20:20:49
                            订单号:TB2016198905050019
                            <Icon style={{color : 'red'}} type="home"/> 莱茵湖畔社区空店
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{textAlign : 'center'}}>
                    <Col style={{height : '120px'}} span={5}>
                        陈皮小沱茶
                    </Col>
                    <Col style={{height : '120px'}} span={3}>
                        100.0
                    </Col>
                    <Col style={{height : '120px'}} span={3}>
                        20
                    </Col>
                    <Col style={{height : '120px'}} span={4}>
                        2000.0
                    </Col>
                    <Col style={{height : '120px'}} span={5}>
                        <p>李师师</p>
                        <p>132888899999</p>
                        <p>广西南宁市青秀区马来西亚园</p>
                    </Col>
                    <Col style={{height : '120px'}} span={4}>
                        <p><Button>我要发货</Button></p>
                        <p><Button>物流信息</Button></p>
                    </Col>
                </Row>
            </Row>

        )
    }
});

export default OrderListTable;
