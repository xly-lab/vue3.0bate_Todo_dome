import vue from 'vue'
import vueRouter from 'vue-router'

import Home from '../views/home.vue'

vue.use(vueRouter);

export default new vueRouter({
    routes:[
        {path:'/',component:Home},
        {path:'/about',component:()=>import('../views/about.vue')},
        {path:'/come',component:()=>import('../views/come.vue')}
    ]
})