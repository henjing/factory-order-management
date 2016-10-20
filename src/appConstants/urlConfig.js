// 导出订单数据
export const enrollCSVUrl = '/Printinfo/storeProductCsv';

// 注销
export const logoutUrl = '/Base/logout';

// 默认头像
export const defaultAvatar = '/img/avatar.jpg';

// 修改密码
export const modifyPasswordUrl = '/Base/modifyPassWord';

// 根据开发环境还是生产环境决定路由
export const routeBase = process.env.NODE_ENV !== 'production' ? '/' : '/';

// 获取订单列表
export const getOrderListUrl = '/Api/index.php/Index/getStoreSupplementList';

// 获取当前登录用户的信息
export const getAdminUrl = '/Api/index.php/Index/getUserInfo';


