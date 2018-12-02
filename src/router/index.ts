import Vue from 'vue'
import Router from 'vue-router'

import sections from './sections/exercises'
import demos from './sections/demos'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Introduction',
      component: () =>
        import ('@/views/introduction/index.vue')
    },
    {
      path: '/overview',
      name: 'Overview',
      component: () =>
        import ('@/views/overview/index.vue')
    },
    ...sections,
    // {
    //   path: '/conclusion',
    //   name: 'Conclusion',
    //   component: () =>
    //     import ('@/views/conclusion')
    // },
    {
      path: '/resources',
      name: 'Resources',
      component: () =>
        import ('@/views/resources/index.vue'),
      redirect: {
        name: 'Brewer Colors'
      },
      children: [{
          name: 'Brewer Colors',
          path: 'brewer',
          component: () =>
            import ('@/views/resources/BrewerColors.vue')
        },
        {
          name: 'Xenographics',
          path: 'xenographics',
          component: () =>
            import ('@/views/resources/xenographics/index.vue')
        },
        {
          name: 'Semiology of Graphics',
          path: 'semiology-of-graphics',
          component: () =>
            import ('@/views/resources/semiology/index.vue')
        },
        {
          name: 'UX Principles as Algorithms',
          path: 'ux-principles',
          component: () =>
            import ('@/views/resources/uxprinciples/index.vue')
        }
      ]
    },
    demos,
    {
path: '/chart',
component: () => import('@/views/ChartView.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
