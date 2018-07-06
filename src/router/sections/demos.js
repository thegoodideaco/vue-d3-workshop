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
      path: 'force-bubble',
      name: 'Clustered Force Bubble Layout',
      component: () =>
        import ('@/views/examples/cluster-force-layout-bubbles')
    }
  ]
}
