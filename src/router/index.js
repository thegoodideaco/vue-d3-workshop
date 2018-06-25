import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/MainPage'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',

      name: 'Introduction',
      component: MainPage
    },
    {
      path: '/overview',
      name: 'Overview',
      alias: ['/'],
      component: () =>
        import ('@/views/PageView'),
      redirect: {
        name: 'Vue'
      },
      children: [{
          path: 'vue',
          name: 'Vue',
          component: () =>
            import ('@/views/overview/L1View'),

          children: [{
            path: 'example',
            name: 'Vue Example',
            component: () =>
              import ('@/views/PieChartView')
          }]
        },
        {
          path: 'd3',
          name: 'D3',
          component: () =>
            import ('@/views/overview/D3View')
        }
      ]
    },
    {
      path: '/exercises',
      name: 'Exercises',
      alias: ['/'],
      component: () =>
        import ('@/views/exercises/Shapes')
    },
    {
      path: '/resources',
      name: 'Resources',
      component: () =>
        import ('@/views/PageView'),
      redirect: {
        name: 'Brewer Colors'
      },
      children: [{
          name: 'Brewer Colors',
          path: 'brewer',
          component: () =>
            import ('@/views/resources/BrewerColors')
        },
        {
          name: 'Semiology of Graphics',
          path: 'semiology-of-graphics',
          component: () =>
            import ('@/views/resources/SemiologyOfGraphics')
        },
        {
          name: 'Brewer Colors',
          path: 'brewer',
          component: () =>
            import ('@/views/resources/BrewerColors')
        },
      ]
    }
  ]
})
