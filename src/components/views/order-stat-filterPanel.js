import React from 'react';
import { Row, Col, Button, Icon, Badge } from 'antd';
import { connect } from 'react-redux';
import { getExpressedOrderFileUrl} from '../../appConstants/urlConfig';

const FilterPanel = React.createClass({
    
    render() {
        const { searchState, status } = this.props;
        let inputGroup = [];
        let finalInputGroup = '';
        let disabled = true;
        for (let i in searchState) {
            if (searchState[i]) {
                inputGroup.push(
                    <input type="hidden" name={i} value={searchState[i]} />
                )
            }
        }
        if (status != 0) {
            finalInputGroup = inputGroup;
            disabled = false;
        }

        return (
            <Row type="flex" align="middle" style={{ marginLeft : 88, height : 100 }}>
                <Col span={16} >
                </Col>
                <Col span={4}/>
                <Col span={4}>
                    <Row type="flex" align="middle" justify="center">
                        <Col>
                            <form action={getExpressedOrderFileUrl} style={{display : 'inline-block'}}>
                                {finalInputGroup}
                                <Button disabled={disabled} htmlType="submit" icon="download">导出列表</Button>
                            </form>

                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        searchState : store.orderStatSearchState,
        status : store.orderStatState.orderStat.info.length
    }
};

export default connect(mapStateToProps)(FilterPanel);

