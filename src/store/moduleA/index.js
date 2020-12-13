import Http from '@/service/http.js'
import {authRoutes} from '@/router/router-auth.js'
const getMenListAndAuth = (value) => {
    let menu = [];
    let sourceMap = {};
    let auth = [];
    value.forEach(m => {
        m.children = []; // 增加孩子列表
        sourceMap[m.id] = m;
        auth.push(m.auth)
        if(m.pid === -1){
            menu.push(m); // 根节点
        }else{
            sourceMap[m.pid] && sourceMap[m.pid].children.push(m);
        }
    });
    return {menu,auth} // 获取菜单数据和权限数据
}
const getRoutes = (auth) => {
    const filter = (authRoutes)=>{
        return authRoutes.filter(route=>{
                // 包含权限
            if(auth.includes(route.name)){
                if(route.children){
                    route.children = filter(route.children);
                }
                return true;
            }
        })
    }
    return filter(authRoutes);
}
const moduleA = {
    namespaced: true,
    state: () => ({ 
        hasPermission: false,
        menu: [], // 菜单权限
        btnPermissions:[] // 按钮权限
     }),
    mutations: { 
        hasPermission_m(state,value){
            state.hasPermission = value;
        },
        menu_m(state,value){
            state.menu = value;
        },
        btnPermissions_m(state,value){
            state.btnPermissions = value;
        }
     },
    actions: { 
        async getPermissions_a({commit,dispath,state}){
            let params = {a:1};
            let auths = await Http.interface1(params);
            console.log(auths);
            // 默认数据
            let menuList = [
                {pid:-1,name:'购物车',id:1,auth:'cart'},
                {pid:1,name:'购物车列表',id:4,auth:'cartList'},
                {pid:4,name:'彩票',id:5,auth:'lottery'},
                {pid:4,name:'商品',id:6,auth:'product'},
                {pid:-1,name:'商店',id:2,auth:'shop'},
                {pid:-1,name:'个人中心',id:3,auth:'store'},
            ];
            commit('menu_m',menuList);
            let {auth} = getMenListAndAuth(menuList);
            sessionStorage.setItem('auth',JSON.stringify(auth));
            auth.push('home');
            auth.push('*');
            // 获取过权限
            commit('hasPermission_m',true);
            return getRoutes(auth);
        },
    },
    getters: { 
        getMenu(state){
            return state.menu||[]
        },
     }
}

export default moduleA