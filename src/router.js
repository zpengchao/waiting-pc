import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Index from './views/Index.vue'
import Reg from './views/Reg.vue'
import Adoption from './views/Adoption.vue'
import Login from './views/Login.vue'
import Addpet from './views/Addpet'
import Details from './views/Details'
import Baike from './views/Baike'
import Admin from './admin/Admin'
import User from './admin/User'
import LoginPro from './admin/LoginPro'
import CheckList from './admin/CheckList'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {path: '/',component: Home,children:
    [ { path:"", component: Index },
      {path: '/index',component: Index},
      {path:'/reg',component: Reg},
      {path:'/adoption',component: Adoption},
      {path:'/addpet',component: Addpet},
      {path:'/details',component: Details},
      {path:'/baike',component: Baike}
    ]
  },
    {path: '/about',component: About},
    {path: '/home',component: Home},
    {path: '/login',component: Login},
    {path: '/admin',component: Admin,children:[
      { path:'/admin/user', component: User },
      { path:'/admin/checklist', component: CheckList }
    ]},
    { path:'/loginpro', component: LoginPro }
  ]
})
