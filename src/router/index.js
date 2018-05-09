import Vue from 'vue'
import Router from 'vue-router'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AppRoot from '@/components/AppRoot'
import Home from '@/components/Home'
import Docs from '@/components/Docs'
import Terms from '@/components/Terms'


Vue.use(Router)

Vue.use(BootstrapVue);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'OnceIO',
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
		}

	  ]

    }
  ]
})
