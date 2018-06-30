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
  }]
}
