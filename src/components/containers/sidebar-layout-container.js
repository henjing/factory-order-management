import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import styles from '../../app.less';
import { Link } from 'react-router';
import { collapseFunc } from '../../api/collapse-api';
import imgSrc from '../../appConstants/assets/images/logo_white.png';
import { Menu, Breadcrumb, Icon } from 'antd';
import { routeBase } from '../../appConstants/urlConfig';
const SubMenu = Menu.SubMenu;

const SidebarLayoutContainer = React.createClass({

    onCollapseChange() {
        store.dispatch(collapseFunc());
    },
    //匹配的导航列表
    matchSubMenu(pathName) {
        const subMenuArray =  {
            'sub1' : ['/order_list', '/order_stat'],
            'sub2' : ['/cashier', '/not_yet_balance', '/balance_order', '/apply_append', '/pay_append', '/pay_success', '/apply_deny', '/template'],
        };
        let matchSubMenu = '';
        let defaultSelectedKey = '';
        for (let i in subMenuArray) {
            // console.log('iiiiiii', i);
            subMenuArray[i].forEach(function (ownPathName) {
                // console.log('ownPathName', ownPathName.slice(0, 6));
                if (ownPathName.slice(0, 8) == pathName.slice(0, 8)) {
                    matchSubMenu = i;
                    defaultSelectedKey = ownPathName;
                    // console.log('hey!', i);
                }
            })
        }
        console.log('aaaaaaaaa', [matchSubMenu, defaultSelectedKey]);
        return [matchSubMenu, defaultSelectedKey];
    },
    render() {
        const collapse = this.props.collapse;
        const sidebarWrapperName = collapse ? 'sidebarWrapperCollapse' : 'sidebarWrapper';
        const mode = collapse ? 'vertical' : 'inline';
        // const pathName = window.location.pathname;
        const pathName = window.location.hash.slice(1, 9);
        // console.log('bbbbbbb', pathName);
        const matchSubMenu = this.matchSubMenu(pathName);
        return (
                <div className={styles[sidebarWrapperName]} style={{transition: 'all 0.3s ease'}}>
                    <div className={styles.logo}>
                        <Link to={routeBase}>
                            <img src={imgSrc} alt="logo"/>
                        </Link>
                    </div>

                    <Menu mode={mode}
                      defaultSelectedKeys={[matchSubMenu[1]]} defaultOpenKeys={[matchSubMenu[0]]}>
                      <SubMenu key="sub1" title={<span><Icon type="home" /><span className={styles.navText}>厂商管理</span></span>}>
                        <Menu.Item key={routeBase + 'order_list'}>
                            <Link to={routeBase + 'order_list'}>
                                订单管理
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routeBase + 'order_stat'}>
                            <Link to={routeBase + 'order_stat'}>
                                发货记录
                            </Link>
                        </Menu.Item>
                      </SubMenu>

                    <SubMenu key="sub2" title={<span><Icon type="pay-circle-o" /><span className={styles.navText}>提现管理</span></span>}>
                        <Menu.Item key={routeBase + 'cashier'}>
                            <Link to={routeBase + 'cashier'}>
                                申请
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routeBase + 'not_yet_balance'}>
                            <Link to={routeBase + 'not_yet_balance'}>
                                未结算订单
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routeBase + 'balance_order'}>
                            <Link to={routeBase + 'balance_order'}>
                                已结算订单
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routeBase + 'apply_append'}>
                            <Link to={routeBase + 'apply_append'}>
                                待审核
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routeBase + 'pay_append'}>
                            <Link to={routeBase + 'pay_append'}>
                                待付款
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routeBase + 'pay_success'}>
                            <Link to={routeBase + 'pay_success'}>
                                已付款
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routeBase + 'apply_deny'}>
                            <Link to={routeBase + 'apply_deny'}>
                                已驳回
                            </Link>
                        </Menu.Item>
                        {/*<Menu.Item key={routeBase + 'template'}>
                            <Link to={routeBase + 'template'}>
                                结算用模板
                            </Link>
                        </Menu.Item>*/}
                      </SubMenu>
                    </Menu>

                    <div className={styles.antAsideAction} onClick={this.onCollapseChange}>
                        {collapse ? <Icon type="right" /> : <Icon type="left" />}
                    </div>
                </div>
            )

    }
});

function mapStateToProps(store) {
    return {
        collapse : store.collapseState.collapse
    }
}

export default connect(mapStateToProps)(SidebarLayoutContainer);