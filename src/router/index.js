import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

const register = () => import( '@/components/register' );
const selectType = () => import( '@/components/select_type' );
const fillInfomation = () => import( '@/components/fill_information')
const f404 = () => import( '@/components/404')
// //公司
// const tripCenter = () => import('@/components/company/trip_center')
// const editPath = () => import('@/components/company/editpath')
// const cAssortments = () => import('@/components/assortments')
// //个人
// const pTripCenter = () => import('@/components/person/trip_center')
// const pAssortments = () => import('@/components/person/assortments')
const tripCenter = () => import('@/components/trip_center')
const editPath = () => import('@/components/editpath')
const assortments = () => import('@/components/assortments')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      alias: '/index'
    },{
      path: '/register/:id?',
      component: register,
      name: 'register',
      meta: {
        requireAuth: true
      }
    },{
      path: '/select_type/:id?',
      component: selectType,
      name: 'selectType',
      meta: {
        requireAuth: true
      }
    },{
      path: '/fill_infomation/:type',
      component: fillInfomation,
      name: 'fillInfomation',
      meta: {
        requireAuth: true
      }
    }
    ,{
      path: '/trip_center/:type',
      component: tripCenter,
      name: 'tripCenter',
      meta: {
        requireAuth: true
      }
    },{
      path: '/assortments',
      component: assortments,
      name: 'assortments',
      meta: {
        requireAuth: true
      }
    },{
      path: '/editpath',
      component: editPath,
      name: 'editPath',
      meta: {
        requireAuth: true
      }
    },
    
    
    {
      path: '/404',
      component: f404,
      name: 'f404',
      meta: {
        requireAuth: true
      }
    }

  ]
})
