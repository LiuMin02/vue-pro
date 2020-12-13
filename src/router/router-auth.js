import Home from '@v/Home.vue'
import cart from '@v/cart/index.vue'
import cartList from '@v/cartList/index.vue'
import lottery from '@v/lottery/index.vue'
// import Home from '@v/product/index.vue'
// import Home from '@v/shop/index.vue'

export const authRoutes = [ // 权限路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
            path: 'cart',
            name: 'cart',
            component: cart,
        },
        {
            path: 'cartList',
            name: 'cartList',
            component: cartList,
        },
        {
            path: 'lottery',
            name: 'lottery',
            component: lottery,
        },
        {
            path: 'product',
            name: 'product',
            component: () => import('@v/product/index.vue'),
        },
        {
            path: 'shop',
            name: 'shop',
            component: () => import('@v/shop/index.vue'),
        },
        {
            path: 'store',
            name: 'store',
            component: () => import('@v/store/index.vue'),
        },
      ],
    },
    {
         path:'*', 
         name:'*',
        component:{ render:h=>h('h1',{},'Not Found') } 
    }
];