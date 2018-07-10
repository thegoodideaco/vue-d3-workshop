export default {
  path: '/demos',
  name: 'Demos',
  component: () =>
    import ('@/views/examples'),
  children: [{
      path: 'versor',
      name: 'Versor Dragging',
      component: () =>
        import ('@/views/examples/versor-dragging')
    },
    {
      path: 'cluster-bubble',
      name: 'Clustered Bubble Charts',
      component: () =>
        import ('@/views/examples/clustered-bubble-charts')
    },
    {
      path: 'hierarchy',
      name: 'Visualizing Hierarchies',
      component: () =>
        import ('@/views/examples/hierarchy'),
      children: [{
        path: 'circle-packing',
        name: 'Circle Packing',
        component: () =>
          import ('@/views/examples/hierarchy/circle-packing')
      }]
    }
  ]
}
