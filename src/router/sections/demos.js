export default {
  path: '/demos',
  name: 'Demos',
  component: () =>
    import ('@/views/examples'),
  children: [
    {
      path: 'parallelcoords',
      name: 'Parallel Coords',
      component: () =>
        import ('@/views/examples/parallelcoords')
    },
    {
      path: 'scales',
      name: 'Scales',
      component: () =>
        import ('@/views/examples/scaling')
    },
    {
      path: 'axis',
      name: 'Axis',
      component: () => import('@/views/examples/axis')
    },
    {
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
          path: 'cluster',
          name: 'Clusters',
          component: () =>
            import ('@/views/examples/hierarchy/cluster')
        },
        {
          path: 'tree',
          name: 'Tree Layout',
          component: () =>
            import ('@/views/examples/hierarchy/tree')
        },
        {
          path: 'treemap',
          name: 'Treemap Layout',
          component: () =>
            import ('@/views/examples/hierarchy/tree-map')
        },
        {
          path: 'partition',
          name: 'Partition Layout',
          component: () =>
            import ('@/views/examples/hierarchy/partitions')
        },
        {
          path: 'pack',
          name: 'Circle Packing',
          component: () =>
            import ('@/views/examples/hierarchy/circle-packing')
        },
        // {
        //   path: 'edge-bundling',
        //   name: 'Edge Bundling',
        //   component: () =>
        //     import ('@/views/examples/hierarchy/edge-bundling')
        // },
        // {
        //   path: 'email-threading',
        //   name: 'Email Threading',
        //   component: () =>
        //     import ('@/views/examples/hierarchy/threads')
        // }
      ]
    }
  ]
}
