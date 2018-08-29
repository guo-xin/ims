import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import agencyList from 'components/agencyList/agencyList'
import agencyCreate from 'components/agencyCreate/agencyCreate'
import forgetPassword from 'components/forgetPassword'
import userList from 'components/authority/userList'
// import roleList from 'components/authority/roleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
        component: forgetPassword
    },
    {
      path: '/main',
      name: 'main',
      redirect: '/main/userList',
      component: main,
      children: [
        {
          path: 'agencyList',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agencyCreate',
          name: 'agencyCreate',
          component: agencyCreate
        },
        {
          path: 'userList',
          name: 'userList',
          component: userList
        },
      ]
    }
  ]
})
