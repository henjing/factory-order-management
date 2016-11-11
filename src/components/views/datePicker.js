import { DatePicker, Button } from 'antd';
import React from 'react';
const RangePicker = DatePicker.RangePicker;
import { Row, Col, Radio } from 'antd';
import { connect } from 'react-redux';
import store from '../../store';
import { updateOrderListSearch, resetOrderListSearch } from '../../actions/order-list-actions';
const RadioGroup = Radio.Group;

const datePicker = React.createClass({

    onChange(dates, dateStrings) {
        store.dispatch(updateOrderListSearch({ page : 1 }));
        this.props.updateSearch('dateStart')(dateStrings[0]);
        this.props.updateSearch('dateEnd')(dateStrings[1]);
        this.props.updateSearch('commit')();
    },

    handleClick(timeLimit) {
        return (() => {
            store.dispatch(updateOrderListSearch({ page : 1 }));
            this.props.updateSearch('timeLimit')(timeLimit);
            this.props.updateSearch('commit')();
        }).bind(this);
    },

    radioChange(e) {
        store.dispatch(updateOrderListSearch({ page : 1 }));
        this.props.updateSearch('order')(e.target.value);
        this.props.updateSearch('commit')();
    },

    handleReset() {
        try {
            document.getElementsByClassName('ant-calendar-picker-clear')[0].click();
        } catch (e) {}
        this.props.updateSearch('reset')();
        this.props.updateSearch('commit')();
    },

    render : function () {
        const typeState = this.props.searchState.timeLimit;
        const radioState = this.props.searchState.order;
        const style = { marginLeft : 8 };
        const disabled = this.props.searchState.timeLimit ? true : false;
        return (
            <Row>
                <Col className="lineHeight" style={{minWidth : 640}}>
                    <span className="spanWidth">日期:</span>
                    <RangePicker disabled={disabled} style={{ width: 284, marginLeft: 8 }} onChange={this.onChange} />
                </Col>
                <Col className="lineHeight" style={{minWidth : 640}}>
                    <span className="spanWidth">排序:</span>
                    <RadioGroup style={{ marginLeft : '8px'}} value={radioState} onChange={this.radioChange}>
                        <Radio key="add_time_desc" value="add_time_desc">订单时间降序</Radio>
                        <Radio key="add_time" value="add_time">订单时间升序</Radio>
                        <Radio key="store_name_desc" value="store_name_desc">店铺名降序</Radio>
                        <Radio key="store_name" value="store_name">店铺名升序</Radio>
                        <Radio key="send_time_desc" value="send_time_desc">发货时间降序</Radio>
                        <Radio key="send_time" value="send_time">发货时间升序</Radio>
                    </RadioGroup>
                </Col>
                <Col className="lineHeight" style={{minWidth : 640}}>
                    <span className="spanWidth">筛选:</span>
                    <Button type={typeState == 'today' ? 'primary' : ''} onClick={this.handleClick('today')} style={style}>今日</Button>
                    <Button type={typeState == 'week' ? 'primary' : ''} onClick={this.handleClick('week')} style={style}>本周</Button>
                    <Button type={typeState == 'month' ? 'primary' : ''} onClick={this.handleClick('month')} style={style}>本月</Button>
                    <Button onClick={this.handleReset} style={style}>重置搜索条件</Button>
                </Col>

            </Row>
        )
    }
});

function mapStateToProps(store) {
    return {
        searchState : store.orderListSearchState
    }
}

export default connect(mapStateToProps)(datePicker);