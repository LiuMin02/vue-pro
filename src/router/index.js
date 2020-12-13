import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  
    {
        path: '/login',
        name: 'login',
        component: () => import('@v/login/index.vue')
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    /* {
        path:'*',
        name:'*' ,
        component:{ render:h=>h('h1',{},'Not Found') } 
    } */
]

const router = new VueRouter({
//   mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to,from,next)=>{
    if(!store.state.a.hasPermission){
            // 获取最新路由列表
            let newRoutes = await store.dispatch('a/getPermissions_a');
            console.log(newRoutes)
            router.addRoutes(newRoutes); // 增加新路由
    }
    next(); // 获取过就不需要再次获取了
})
export default router
/* router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
      initMenu(router, store)
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done() // if current page is dashboard will not trigger    afterEach hook, so manually handle it
      } else {
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        NProgress.done()
      }
    }
  })
   
  
  export const initMenu = (router, store) => {
    if (store.state.security.routes.length > 0) {
      return null
    }
    if (!util.getObjArr('router')) {
      return null
    } else {
      var getRouter = formatRoutes(util.getObjArr('router'))// 动态路由
      getRouter.push({ path: '*', redirect: '/404', hidden: true })
      const newRouter = constantRouterMap.concat(getRouter)
      router.addRoutes(newRouter)
      console.log(newRouter)
      store.commit(types.SET_ROUTES, newRouter)
    }
  }
  
  export const formatRoutes = (routes) => {
    const fmRoutes = []
    routes.forEach(router => {
      const path = router.path
      let component
      if (router.component === 'Layout') {
        component = Layout
      } else {
        component = _import(router.component)
      }
      const name = router.name
      const icon = router.icon
      let children = router.children
      if (children && children instanceof Array) {
        children = formatRoutes(children)
      }
      var fmRouter = {
        path: path,
        component: component,
        name: name,
        // icon: icon,
        meta: { title: name, icon: icon },
        children: children
      }
      fmRoutes.push(fmRouter)
    })
    return fmRoutes
  } */