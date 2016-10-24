import React from 'react';
import { Row, Col, Icon } from 'antd';

const ModalTableRow = React.createClass({
    
    render() {
        const { dataSource } = this.props;
        let length = 0;
        try { length = dataSource.goods_info.length } catch (e) {}
        let colList = [];
        const rowStyle = { height : '40px', lineHeight : '40px', background : '#f6f9fb', marginLeft : '-15px', marginRight : '-15px'};
        const colStyle = { textAlign : 'center'};
        const height = 120 * length + 'px';

        while (length > 0) {
            let i = 0;
            let colSource = dataSource.goods_info[i];
            colList.push(
                <Col style={{height : '120px', lineHeight : '120px'}}>
                    <Row style={{marginLeft : '-15px', marginRight : '-15px'}}>
                        <Col span={14} style={colStyle}>
                            <img src={colSource.goods_img} style={{width: '80px', height: '80px', borderRadius : '6px'}} />
                            &nbsp;
                            <span style={{width : '80px', overflow : 'hidden', textOverflow : 'ellipsis', whiteSpace : 'nowrap'}}>
                                {colSource.goods_name}
                            </span>
                        </Col>
                        <Col span={5} style={colStyle}>
                            {colSource.goods_price}
                        </Col>
                        <Col span={5} style={colStyle}>
                            {colSource.goods_num}
                        </Col>
                    </Row>
                </Col>
            );
            i++;
            length--;
        }
        
        return (
            <div>
                <Row  >
                    <Col>
                        <Row style={rowStyle}>
                            <Col style={{marginLeft : '26px'}}>
                                {dataSource.add_time} &nbsp;
                                订单号: {dataSource.record_sn} &nbsp;
                                <Icon style={{color : 'red'}} type="home" /> &nbsp;
                                {dataSource.store_name}
                            </Col>
                        </Row>
                    </Col>
                    {colList}
                </Row>
            </div>
        )
    }
});

export default ModalTableRow;
