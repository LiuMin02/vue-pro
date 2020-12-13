import axios from 'axios'
import service from './someApi'
import ViewUI from 'view-design'

// 遍历service取出不同的请求方法
let instance = axios.create({
    baseURL:'https://cloud.vcolco.com:8443',
    timeout:30000,
    headers: {
        token: "H5200318"
    }
});
// 包裹请求方法的容器
const Http = {};
for (const key in service) {
    let api = service[key];//每个接口的url method
    Http[key] = async function (
        params,//请求参数
        isFormData = false,//是否是form-data请求
        config = {}//配置参数
    ) {
        let url = api.url;
        let newParams = {};
        // 是否是form-data 的判断
        if (params && isFormData) {
            newParams = new FormData();
            for (const i in params) {
                newParams.append(i,params[i]);
            }
        }else{
            newParams = params;
        }
        // 不同请求 不同处理
        let method = api.method.toLowerCase(), response; //返回值
        if (method==='put' || method ==='post' || method === 'patch') {
            try {
                response = await instance[method](url,newParams,config);
            } catch (err) {
                response = err;
            }
        }else if (method === 'delete') {
            config.params = newParams;//delete约定将参数放在url上； 如果需要放在data里面，则在config里面设置data就好
            try {
                response = await instance[method](url,config);
            } catch (err) {
                response = err;
            }
        }else{
            // get方法
            config.params = newParams;
            try {
                response = await instance[method](url,config);
            } catch (err) {
                response = err;
            }
        }
        return response;
    }
}
/*
 qs 将对象 序列化成URL的形式 以&进行拼接
 qs.stringify({ids:[1,2,3]},{arrayFormat:'indices'})   // 结果 ids[0]=1&ids[1]=2&ids[2]=3
 qs.stringify({ids:[1,2,3]},{arrayFormat:'brackets'})   // 结果 ids[]=1&ids[]=2&ids[]=3
 qs.stringify({ids:[1,2,3]},{arrayFormat:'repeat'})   // 结果 ids=1&ids=2&ids=3
 qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })   // 结果 'a=b,c'
*/
// 拦截器添加
// 请求拦截器
instance.interceptors.request.use(config=>{
    return config;
},err=>{
    ViewUI.$Message.warning('请求错误，请稍候重试');
});
// 响应拦截器
instance.interceptors.response.use(res=>{
    return res.data;
},()=>{
    ViewUI.$Message.warning('请求错误，请稍后重试');
});
export default Http;