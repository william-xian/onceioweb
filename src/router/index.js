import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource';

import iView from 'iview';
import 'iview/dist/styles/iview.css';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AppRoot from '@/components/AppRoot'
import Home from '@/components/Home'
import Docs from '@/components/Docs'
import Terms from '@/components/Terms'
import Markdown from '@/components/Markdown'

import ApiDoc from '@/components/ApiDoc'
import ApiDocs from '@/components/ApiDocs'


Vue.use(Router)
Vue.use(BootstrapVue);
Vue.use(iView);
Vue.use(VueResource) 

Vue.component('Markdown', Markdown);
Vue.component('ApiDoc', ApiDoc);
Vue.component('ApiDocs', ApiDocs);

export default new Router({
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
})
