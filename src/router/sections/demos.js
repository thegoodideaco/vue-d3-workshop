/**
 * @type {import('vue-router').RouteConfig}
 */
const config = {
  path: '/demos',
  name: 'Demos',

  component: () =>
    import('@/views/examples'),
  children: [{
      path: 'parallelcoords',
      name: 'Parallel Coords',
      component: () =>
        import('@/views/examples/parallelcoords/index.vue')
    },
    {
      path: 'scales',
      name: 'Scales',
      component: () =>
        import('@/views/examples/scaling/index.vue')
    },
    {
      path: 'axis',
      name: 'Axis',
      component: () => import('@/views/examples/axis/index.vue')
    },
    {
      path: 'versor',
      name: 'Versor Dragging',
      component: () =>
        import('@/views/examples/versor-dragging/index.vue')
    },
    {
      path: 'cluster-bubble',
      name: 'Clustered Bubble Charts',
      component: () =>
        import('@/views/examples/clustered-bubble-charts/index.vue')
    },
    {
      path: 'hierarchy',
      name: 'Visualizing Hierarchies',
      component: () =>
        import('@/views/examples/hierarchy/index.vue'),
      children: [{
          path: 'cluster',
          name: 'Clusters',
          component: () =>
            import('@/views/examples/hierarchy/cluster/index.vue')
        },
        {
          path: 'tree',
          name: 'Tree Layout',
          component: () =>
            import('@/views/examples/hierarchy/tree/index.vue')
        },
        {
          path: 'treemap',
          name: 'Treemap Layout',
          component: () =>
            import('@/views/examples/hierarchy/tree-map/index.vue')
        },
        {
          path: 'partition',
          name: 'Partition Layout',
          component: () =>
            import('@/views/examples/hierarchy/partitions/index.vue')
        },
        {
          path: 'pack',
          name: 'Circle Packing',
          component: () =>
            import('@/views/examples/hierarchy/circle-packing/index.vue')
        },
      ]
    }
  ]
}

/**
 * Manages sections for demo displays
 * @module router-demos
 */
export default config