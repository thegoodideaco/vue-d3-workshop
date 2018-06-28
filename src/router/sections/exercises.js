export default [
  {
    path: '/making-dots',
    name: 'Making Dots',
    component: () => import('@/views/exercises/creating-dots')
  },
  {
    path: '/connecting-dots',
    name: 'Connecting the Dots',
    component: () => import('@/views/exercises/connecting-dots')
  },
  {
    path: '/arc',
    name: 'Creating an Arc',
    component: () => import('@/views/exercises/arc')
  },
  {
    path: '/pie',
    name: 'Composing a Pie',
    component: () => import('@/views/exercises/pie-chart')
  },
]
