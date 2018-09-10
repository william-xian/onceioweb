import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import VueMarkdown from 'vue-markdown';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AppRoot from '@/components/AppRoot'
import Home from '@/components/Home'
import Docs from '@/components/Docs'
import Terms from '@/components/Terms'
import MBook from '@/components/MBook'

import ApiDoc from '@/components/ApiDoc'

import MVDItem from '@/components/MVDItem'
import MVD from '@/components/MVD'

import ApiDocs from '@/components/ApiDocs'

import Signin from '@/components/Signin'

import SignupCallback from '@/components/SignupCallback'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(BootstrapVue);

Vue.component('MBook', MBook);
Vue.component('ApiDoc', ApiDoc);
Vue.component('ApiDocs', ApiDocs);
Vue.component('Signin',Signin)
Vue.component('MVDItem',MVDItem);
Vue.component('MVD',MVD);
Vue.component('SignupCallback',SignupCallback);

Vue.use(VueRouter);
Vue.use(App);
Vue.use(VueMarkdown);


let router = new VueRouter({
  routes: [
    {
      path: '/',
      component: AppRoot,
      children : [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/docs',
            name: 'Docs',
            component: Docs
        },
        {
            path: '/terms',
            name: 'Terms',
            component: Terms
        },
        {
            path: '/apidoc',
            name: 'ApiDoc',
            component: ApiDocs
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/mvd',
            name: 'MVD',
            component: MVD
        },
        {
            path: '/callback/:platform',
            name: 'SignupCallback',
            component: SignupCallback
        }


      ]

    }
  ]
});
var $G =  {
    user : {}
};
Vue.prototype.$G = $G;

var $http = Axios;
Axios.defaults.baseURL = 'http://www.onceio.top';
// Axios.defaults.headers.common['Authorization'] = Vue.prototype.$G.user.userId;
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Axios.defaults.withCredentials = true;

Axios.interceptors.request.use(function(config){
    if($G.user.userId) {
        config.headers.common['Cookie'] = 'userId='+ $G.user.userId + '; accessToken=' + $G.user.accessToken;
        console.log(JSON.stringify(config,null,4));
    }
    return config;
  },function(err) {
    return Promise.reject(err);
});


Axios.interceptors.response.use(function(res){
    //在这里对返回的数据进行处理
    if(res.data.ERROR != null) {
        alert(res.data.ERROR);
        throw res.data.ERROR;
    }else {
        return res;
    }
  },function(err){
      alert(err);
  })
  

Vue.prototype.$http = $http

Vue.prototype.setCookie = function (name, value, days) {

    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};
Vue.prototype.getCookie= function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
};

Vue.prototype.deleteCookie = function (name) {
    this.set(name, '', -1);
}

let app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
Vue.use({
    app
});
