import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Layout from './components/Layout.vue'
import Common from "@/components/Common";
import Login from "@/components/Login";
import Report from "@/components/Report";
import * as echarts from 'echarts'
import Banner from "@/components/Banner";
import ChangeBanner from "@/components/ChangeBanner";
import ExcellentCourses from "@/components/ExcellentCourses";
import Course from "@/components/Course";
import VideoPlayer from 'vue-video-player';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.GLOBAL = Common
Vue.prototype.$echarts = echarts
Vue.use(VideoPlayer)

const routes = [
    {
      path: '/login',
      component: Login
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'banner_list',
                components: {
                    content: Banner
                }
            },
            {
                path: 'change_banner',
                name: 'change_banner',
                components: {
                    content: ChangeBanner
                }
            },
            {
                path: 'report',
                name: 'Report',
                components: {
                    content: Report
                }
            },
            {
                path: 'excellent_courses',
                name: 'ExcellentCourses',
                components: {
                    content: ExcellentCourses
                }
            },
            {
                path: 'course',
                name: 'course',
                components: {
                    content: Course
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')