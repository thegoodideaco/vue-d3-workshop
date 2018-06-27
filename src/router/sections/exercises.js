export default {
  name: 'Exercises',
  path: '/exercises',
  component: () =>
    import ('@/views/PageView'),
  children: [{
      name: 'Using D3 with Vue',
      path: 'using-d3-and-vue',
      component: () =>
        import ('@/views/exercises/Excercise1'),
      children: [{
        name: 'Exercise Summary',
        path: 'summary',
        component: () =>
          import ('@/views/exercises/Shapes')
      }]
    },

    {
      name: 'Using D3 with Vue',
      path: 'using-d3-and-vue',
      component: () =>
        import ('@/views/exercises/Shapes')
    },
    {
      name: 'Using D3 with Vue',
      path: 'using-d3-and-vue',
      component: () =>
        import ('@/views/exercises/Shapes')
    },
  ]
}
