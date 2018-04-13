import iview from 'iview'
import axios from 'axios'
import config from './http_config'
import { getCookie } from './server_func'

const httpConfig = process.env.NODE_ENV === 'production' ? config.prod : config.dev;
const loadingConfig = function(text){
    const loadingText = text || '加载中...'
    return {
        render: (h) => {
            return h('div', {class: 'loading-wrapper'}, [
                h('Icon', {
                    'class': 'loading-spin-icon-load',
                    props: {
                        type: 'load-c',
                        size: 18
                    }
                }),
                h('div', loadingText)                  
            ])
        }
    }
}

const axiosInstance = axios.create({
    baseURL: httpConfig.baseApiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
        'Accept': 'application/json;charset=utf-8;'
    },
    params: {
        token: getCookie('user_token')
    },
    data: {
        token: getCookie('user_token')
    }
})

//请求拦截器
axiosInstance.interceptors.request.use(function(config) {
    iview.Spin.show(loadingConfig());
    return config;
}, function(error) {
    iview.Spin.hide();
    iview.Message.config({
        top: '250'
    })
    iview.Message.warning('请求超时')
    
});

//响应拦截器
axiosInstance.interceptors.response.use(function(data) {
    iview.Spin.hide();
    return data;
}, function(error) {
    iview.Spin.hide();
    iview.Message.config({
        top: '250'
    })
    iview.Message.warning('加载超时')
    return Promise.reject(error)
});

export default axiosInstance