// 注销
export const logoutUrl = '/Api/index.php/Index/logout';

// 登录页
export const loginUrl = 'login/index.html';

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

// 获取物流单号详情
export const expressDetailUrl = '/Api/index.php/Index/showExpressDetail';

// 厂家发货操作
export const factorySendUrl = '/Api/index.php/Index/factorySend';

// 获取快递公司列表
export const expressListUrl = '/Api/index.php/Index/getExpressList';

// 获取已发货订单列表
export const getExpressedOrderUrl = '/Api/index.php/Index/getExpressedSupplementList';

// 获取该厂商销售的商品种类列表
export const getGoodsCategoryUrl = '/Api/index.php/Index/getGoodsList';

// 导出已发货订单列表
export const getExpressedOrderFileUrl = '/Api/index.php/Index/makeOutExpressSupplementList';

// 导出订单列表
export const getOrderListFileUrl = '/Api/index.php/Index/makeOutSupplementList';

// 修改快递单号
export const modifyExpressNumUrl = '/Api/index.php/Index/modifyExpressSn';
