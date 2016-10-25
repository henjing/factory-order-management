import { DatePicker, Button } from 'antd';
import React from 'react';
const RangePicker = DatePicker.RangePicker;
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

const datePicker = React.createClass({

    onChange(dates, dateStrings) {
        this.props.updateSearch('dateStart')(dateStrings[0]);
        this.props.updateSearch('dateEnd')(dateStrings[1]);
        this.props.updateSearch('commit')();
    },

    handleClick(timeLimit) {
        return (() => {
            this.props.updateSearch('timeLimit')(timeLimit);
            this.props.updateSearch('commit')();
        }).bind(this);
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
        const style = { marginLeft : 8 };
        const disabled = this.props.searchState.timeLimit ? true : false;
        return (
            <Row>
                <Col className="lineHeight" style={{minWidth : 640}}>
                    <span className="spanWidth">日期:</span>
                    <RangePicker disabled={disabled} style={{ width: 284, marginLeft: 8 }} onChange={this.onChange} />
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
        searchState : store.orderStatSearchState
    }
}

export default connect(mapStateToProps)(datePicker);