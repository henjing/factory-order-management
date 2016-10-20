import React from 'react';
import { Row, Col, Button, Icon, Badge } from 'antd';

const FilterPanel = React.createClass({
    render() {
        return (
            <Row type="flex" align="middle" style={{ marginLeft : 88, height : 100 }}>
                <Col span={16} >
                    <Button >全部订单</Button>
                    <Button style={{marginLeft : 8}}>已发货订单</Button>
                    <Badge count={99}>
                        <Button style={{marginLeft : 8}}>未发货订单</Button>
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

export default FilterPanel;

