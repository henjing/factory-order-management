import React from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';

let AtomCheckbox = React.createClass({
    getInitialState() {
        return {
            checked : true
        }
    },
    onChange(e) {
        this.setState({checked : e.target.checked});
        this.props.onChange(e);  
    },
    componentDidMount() {
        this.setState({checked : true});
    },
    componentWillReceiveProps(nextProps) {
        // console.log('nextProps', nextProps);
        if (!nextProps.visible) {
            this.setState({checked : true});
        }
    },
    render() {
        return (
            <Checkbox checked={this.state.checked} onChange={this.onChange}>单独发{this.props.goods_name}</Checkbox>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        visible : store.factorySendState.visible
    }
};

export default connect(mapStateToProps)(AtomCheckbox);