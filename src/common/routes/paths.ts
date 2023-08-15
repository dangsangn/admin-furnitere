// ----------------------------------------------------------------------
function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOT_AUTH = '/auth';
export const ROOT_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: path(ROOT_AUTH, '/login'),
  register: path(ROOT_AUTH, '/register'),
  loginUnprotected: path(ROOT_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOT_AUTH, '/register-unprotected'),
  verify: path(ROOT_AUTH, '/verify'),
  resetPassword: path(ROOT_AUTH, '/reset-password'),
  newPassword: path(ROOT_AUTH, '/new-password'),
  forgotPassword: path(ROOT_AUTH, '/forgot-password'),
  emailConfirmation: path(ROOT_AUTH, '/email-confirmation'),
  approvedNotification: path(ROOT_AUTH, '/pending-approval'),
};

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: '/',
  general: {
    app: path(ROOT_DASHBOARD, '/app'),
  },
  merchant: {
    root: path(ROOT_DASHBOARD, '/merchant'),
    settings: path(ROOT_DASHBOARD, '/merchant/settings'),
    change_password: path(ROOT_DASHBOARD, '/merchant/change-password'),
  },
  home: {
    root: path(ROOT_DASHBOARD, '/home'),
    list: path(ROOT_DASHBOARD, '/home/list'),
    create: path(ROOT_DASHBOARD, '/home/create'),
  },
  agent_management: {
    root: path(ROOT_DASHBOARD, '/agent-management'),
    list: path(ROOT_DASHBOARD, '/agent-management/list'),
    edit: path(ROOT_DASHBOARD, '/agent-management/edit/:id'),
    create: path(ROOT_DASHBOARD, '/agent-management/create'),
  },
  userManagement: {
    root: path(ROOT_DASHBOARD, '/user-management'),
    list: path(ROOT_DASHBOARD, '/user-management/list'),
    view: (userId: number) => path(ROOT_DASHBOARD, `/user-management/detail/${userId}`),
    listGroupUser: path(ROOT_DASHBOARD, `/user-management/list-group-user`),
    createGroupUser: path(ROOT_DASHBOARD, '/user-management/create-group-user'),
    editGroupUser: (userId: number) =>
      path(ROOT_DASHBOARD, `/user-management/edit-group-user/${userId}`),
    listIntroduceUser: path(ROOT_DASHBOARD, `/user-management/list-introduce-user`),
    editUser: (userId: number) => path(ROOT_DASHBOARD, `/user-management/edit/${userId}`),
  },

  product: {
    root: path(ROOT_DASHBOARD, '/product'),
    list: path(ROOT_DASHBOARD, '/product/list'),
    new: path(ROOT_DASHBOARD, '/product/new'),
    detail: path(ROOT_DASHBOARD, '/product/detail/:id'),
    edit: path(ROOT_DASHBOARD, '/product/edit/:id'),
  },
  product_attribute: {
    root: path(ROOT_DASHBOARD, '/product-attribute'),
    list: path(ROOT_DASHBOARD, '/product-attribute/list'),
    new: path(ROOT_DASHBOARD, '/product-attribute/new'),
    edit: path(ROOT_DASHBOARD, '/product-attribute/edit/:id'),
  },
  product_attribute_term: {
    root: path(ROOT_DASHBOARD, '/product-attribute-term'),
    list: path(ROOT_DASHBOARD, '/product-attribute-term/list'),
    new: path(ROOT_DASHBOARD, '/product-attribute-term/new'),
    edit: path(ROOT_DASHBOARD, '/product-attribute-term/edit/:id'),
  },
  product_variant: {
    root: path(ROOT_DASHBOARD, '/product-variant'),
    list: path(ROOT_DASHBOARD, '/product-variant/list'),
    new: path(ROOT_DASHBOARD, '/product-variant/new'),
    edit: path(ROOT_DASHBOARD, '/product-variant/edit/:id'),
  },
  category: {
    root: path(ROOT_DASHBOARD, '/category'),
    new: path(ROOT_DASHBOARD, '/category/new'),
    list: path(ROOT_DASHBOARD, '/category/list'),
    edit_base: path(ROOT_DASHBOARD, '/category/edit/:id'),
    edit: (categoryId: number) => path(ROOT_DASHBOARD, `/category/edit/${categoryId}`),
  },
  notify_management: {
    root: path(ROOT_DASHBOARD, '/notify-management'),
    list: path(ROOT_DASHBOARD, '/notify-management/list'),
    create: path(ROOT_DASHBOARD, '/notify-management/create'),
    duplicate: path(ROOT_DASHBOARD, '/notify-management/duplicate/:id'),
  },
  order_management: {
    root: path(ROOT_DASHBOARD, '/order_management'),
    list_physical: path(ROOT_DASHBOARD, '/order_management/list-physical'),
    detail: path(ROOT_DASHBOARD, '/order_management/detail/:id'),
    detailProd: path(
      ROOT_DASHBOARD,
      '/order_management/detailProduct/:id/:idProd/:idVariant'
    ),
    edit: path(ROOT_DASHBOARD, '/order_management/edit/:id'),
    list_voucher: path(ROOT_DASHBOARD, '/order_management/list-voucher'),
    list_refund: path(ROOT_DASHBOARD, '/order_management/list-refund-coin'),
    view_refund: (id: string) =>
      path(ROOT_DASHBOARD, `/order_management/refund-detail/${id}`),
    list_refund_request: path(ROOT_DASHBOARD, '/order_management/list-refund-request'),
  },
  fileManage: {
    root: path(ROOT_DASHBOARD, '/file-manage'),
    listFileExport: path(ROOT_DASHBOARD, '/file-manage/list-export'),
    listFileImport: path(ROOT_DASHBOARD, '/file-manage/list-import'),
  },
  tag: {
    root: path(ROOT_DASHBOARD, '/tag'),
    list: path(ROOT_DASHBOARD, '/tag/list'),
    edit: path(ROOT_DASHBOARD, '/tag/edit/:id'),
    new: path(ROOT_DASHBOARD, '/tag/new'),
  },
  e_wallet: {
    root: path(ROOT_DASHBOARD, '/e-wallet'),
    depositing: path(ROOT_DASHBOARD, '/e-wallet/depositing'),
  },
  loyalty_code: {
    root: path(ROOT_DASHBOARD, '/loyalty-code'),
    list: path(ROOT_DASHBOARD, '/loyalty-code/list'),
    edit: (id: number) => path(ROOT_DASHBOARD, `/loyalty-code/${id}/edit`),
    create: path(ROOT_DASHBOARD, '/loyalty-code/create'),
  },
  news: {
    root: path(ROOT_DASHBOARD, '/news'),
    list: path(ROOT_DASHBOARD, '/news/list'),
    new: path(ROOT_DASHBOARD, '/news/new'),
    detail: path(ROOT_DASHBOARD, '/news/detail/:id'),
    edit: path(ROOT_DASHBOARD, '/news/edit/:id'),
  },
  news_subject: {
    root: path(ROOT_DASHBOARD, '/subject'),
    list: path(ROOT_DASHBOARD, '/subject/list'),
    new: path(ROOT_DASHBOARD, '/subject/new'),
    edit: path(ROOT_DASHBOARD, '/subject/edit/:id'),
  },
  gameManage: {
    root: path(ROOT_DASHBOARD, '/game'),
    list: path(ROOT_DASHBOARD, '/game/list'),
    create: path(ROOT_DASHBOARD, '/game/create'),
    edit: (id: string) => path(ROOT_DASHBOARD, `/game/edit/${id}`),
    winHistory: path(ROOT_DASHBOARD, '/game/game-win-history'),
  },
  popupManage: {
    root: path(ROOT_DASHBOARD, '/popup'),
    list: path(ROOT_DASHBOARD, '/popup/list'),
    create: path(ROOT_DASHBOARD, '/popup/create'),
    edit: (id: string) => path(ROOT_DASHBOARD, `/popup/edit/${id}`),
  },
  gameGift: {
    root: path(ROOT_DASHBOARD, '/game'),
    list: (id: string) => path(ROOT_DASHBOARD, `/game/${id}/game-gift/list`),
    create: (id: string) => path(ROOT_DASHBOARD, `/game/${id}/game-gift/create`),
    detail: (gameId: string, giftId: string) =>
      path(ROOT_DASHBOARD, `/game/${gameId}/game-gift/${giftId}`),
    edit: (gameId: string, giftId: string) =>
      path(ROOT_DASHBOARD, `/game/${gameId}/game-gift/${giftId}/edit`),
  },
  configPlayTime: {
    root: path(ROOT_DASHBOARD, '/config-play-time'),
    list: path(ROOT_DASHBOARD, '/config-play-time/list'),
    create: path(ROOT_DASHBOARD, '/config-play-time/create'),
    edit: path(ROOT_DASHBOARD, '/config-play-time/:id'),
  },
  featureManage: {
    root: path(ROOT_DASHBOARD, '/config'),
    list: path(ROOT_DASHBOARD, '/config/feature/list'),
    rule_list: path(ROOT_DASHBOARD, '/config/rule/list'),
  },
  manageEvoucher: {
    root: path(ROOT_DASHBOARD, '/e-voucher'),
    checkCode: path(ROOT_DASHBOARD, '/e-voucher/check-code'),
    create: path(ROOT_DASHBOARD, '/e-voucher/create'),
    list: path(ROOT_DASHBOARD, '/e-voucher/list'),
  },
};
