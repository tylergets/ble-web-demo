import Vue from 'vue'
import Router from 'vue-router'
import HexView from '@/components/HexView'
import PlainView from '@/components/PlainView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PlainView',
      component: PlainView
    },
    {
      path: '/decoded',
      name: 'HexView',
      component: HexView
    },
  ]
})
