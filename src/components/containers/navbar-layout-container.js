import React from 'react';
import styles from '../../app.less';
import { connect } from 'react-redux';
import { getAdmin } from '../../api/admin-api';
import { Menu, Dropdown, Icon } from 'antd';
import ModifyPassword from '../views/modifyPassword';
import { passwordModalToggle } from '../../actions/admin-actions';
import store from '../../store';
import { logoutUrl, defaultAvatar } from '../../appConstants/urlConfig';
import { getOrderStatList, getGoodsCategoryList } from '../../api/order-stat-api';

const NavbarLayoutContainer = React.createClass({
    
    componentDidMount : function () {
        getAdmin({});
        getGoodsCategoryList();
    },

    handleClick() {
        store.dispatch(passwordModalToggle());
    },

    render : function () {
        const menu = (
          <Menu>
            <Menu.Item>
              <a href={logoutUrl}>注销</a>
            </Menu.Item>
              {/*<Menu.Item>
                <span onClick={this.handleClick}>修改密码</span>
                <ModifyPassword />
            </Menu.Item>*/}
          </Menu>
        );
        const admin = this.props.admin;
        return (
            <nav className="navbar navbar-default navbar-fixed" style={{marginBottom : '0px', background : 'transparent'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="navbar-header"></div>
                            <div className="navbar-lists">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={styles.navLi}>
                                        <img src={admin.wechat_avatar ? admin.wechat_avatar : defaultAvatar} alt="avatar"/>
                                        &nbsp;
                                        <span>{admin.user_name}</span>
                                    </li>
                                    {<li className={styles.navLi + ' ' + styles.setup}>
                                        <Dropdown overlay={menu}>
                                            <a>
                                                <span className="fa fa-cog" />
                                            </a>
                                        </Dropdown>
                                    </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
});

const mapStateToProps = function (store) {
    return {
        admin : store.adminState.info
    }
};

export default connect(mapStateToProps)(NavbarLayoutContainer);