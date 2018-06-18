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
import Markdown from '@/components/Markdown'

import ApiDoc from '@/components/ApiDoc'
import ApiDocs from '@/components/ApiDocs'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(BootstrapVue);
Vue.use(VueResource) 

Vue.component('Markdown', Markdown);
Vue.component('ApiDoc', ApiDoc);
Vue.component('ApiDocs', ApiDocs);

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