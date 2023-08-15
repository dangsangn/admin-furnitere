// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// components
import Iconify from 'src/common/components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  subject: getIcon('ic_news_subject'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  setting: getIcon('ic_menu_item'),
  policy: getIcon('ic_policy'),
  document: getIcon('ic_policy'),
  storeInMap: getIcon('ic_store_in_map'),
  product: <Iconify icon="fluent-mdl2:product-variant" />,
  order: <Iconify icon="icon-park-outline:transaction-order" />,
  attribute: <Iconify icon="carbon:carbon-for-ibm-product" />,
  term: <Iconify icon="fluent:task-list-square-add-20-regular" />,
  variant: <Iconify icon="fluent-mdl2:product-release" />,
  config: <Iconify icon="eos-icons:configuration-file-outlined" />,
  point: <Iconify icon="teenyicons:ms-powerpoint-solid" />,
  survey: <Iconify icon="wpf:survey" />,
  popup: <Iconify icon="entypo:popup" />,
  manageAgent: <Iconify icon="wpf:administrator" />,
  userManage: <Iconify icon="mdi:user-box" />,
  category: <Iconify icon="bxs:category-alt" />,
  tag: <Iconify icon="mingcute:tag-line" />,
  homeScreen: <Iconify icon="gg:home-screen" />,
  tierRank: <Iconify icon="fa6-solid:ranking-star" />,
  notification: <Iconify icon="mdi:notification-settings" />,
  wheel: <Iconify icon="mdi:dharma-wheel" />,
  homeSetting: <Iconify icon="ep:setting" />,
  history: <Iconify icon="material-symbols:history-rounded" />,
  store: <Iconify icon="ic:sharp-store-mall-directory" />,
  giftOrder: <Iconify icon="ph:gift-bold" />,
  historyScan: <Iconify icon="mdi:magnify-scan" />,
  configFeature: getIcon('ic_config_event'),
  game: <Iconify icon="ion:game-controller" />,
  feedback: <Iconify icon="fluent:person-feedback-28-regular" />,
  loyalty_code: <Iconify icon="vaadin:qrcode" />,
  news: <Iconify icon="fluent:news-28-regular" />,
  voucher: <Iconify icon="mdi:voucher" />,
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Analytics',
  //   items: [],
  // },
  {
    subheader: 'Thống kê',
    items: [],
  },
  {
    subheader: 'app',
    items: [
      {
        // action: Action.READ,
        // resource: Resource.TAG,
        // actionAbility: ActionAbility.CAN,
        title: 'Tag',
        path: PATH_DASHBOARD.tag.root,
        icon: ICONS.tag,
        children: [
          {
            title: 'Danh sách Tag',
            path: PATH_DASHBOARD.tag.list,
          },
          {
            title: 'Thêm mới Tag',
            path: PATH_DASHBOARD.tag.new,
          },
        ],
      },
      {
        // action: Action.READ,
        // resource: Resource.TAG,
        // actionAbility: ActionAbility.CAN,
        title: 'Category',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.menuItem,
        children: [
          {
            title: 'Danh sách danh mục',
            path: PATH_DASHBOARD.category.list,
          },
          {
            title: 'Thêm mới danh mục',
            path: PATH_DASHBOARD.category.new,
          },
        ],
      },
      {
        // action: Action.READ,
        // resource: Resource.TAG,
        // actionAbility: ActionAbility.CAN,
        title: 'Sản phẩm',
        path: PATH_DASHBOARD.tag.root,
        icon: ICONS.product,
        children: [
          {
            title: 'Danh sách sản phẩm',
            path: PATH_DASHBOARD.product.list,
          },
          {
            title: 'Thêm mới sản phẩm',
            path: PATH_DASHBOARD.product.new,
          },
        ],
      },
    ],
  },
];

export default navConfig;
