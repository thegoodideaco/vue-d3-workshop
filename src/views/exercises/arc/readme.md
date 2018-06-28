# Creating an Arc

So, just like `line`, Arc is another shape that D3 offers. The same pattern
applys, but with different properties. Some of this deals with trigonometry, but
for the most part, D3 will take care of the hard parts.

One thing to note, is that both `line` and `arc` are both considered pieces of a
`shape layout`, such as `Pie` and `Area`, which combine arcs and lines together
into one shape. The next exercise will cover the composition of these shapes.

Since we are going to reuse this arc inside of of another shape, let's name it
accordingly.

`@/components/d3/D3Arc.vue`

```html
<!-- Empty Template with path as the template tag -->
<template>
  <path/>
</template>

<script>
export default {}
</script>
```

There are **5** properties of the arc that can be reactive:

- startAngle
- endAngle
- innerRadius
- outerRadius
- borderRadius
