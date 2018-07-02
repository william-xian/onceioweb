import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import VueMarkdown from 'vue-markdown';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource';


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

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(BootstrapVue);
Vue.use(VueResource) 

Vue.component('MBook', MBook);
Vue.component('ApiDoc', ApiDoc);
Vue.component('ApiDocs', ApiDocs);
Vue.component('Signin',Signin)
Vue.component('MVDItem',MVDItem);
Vue.component('MVD',MVD);

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
        }


      ]

    }
  ]
});


let app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

Vue.use({
    app
});
