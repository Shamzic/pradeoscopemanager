import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewPost from '@/components/NewPost'
import ViewPost from '@/components/ViewPost'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-post',
      component: NewPost
    },
    {
      path: '/edit/:post_id',
      name: 'edit-post',
      component: EditPost
    },
    {
      path: '/:title',
      name: 'view-post',
      component: ViewPost
    },
  ]
})
