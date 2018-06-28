# Composing a Pie Chart

Since SVG's can nest elements, we can use that to construct a pie chart using the `Arc Component` we just made. This matches perfectly with Vue's Nestable Component Pattern. So let's do exactly that. This will also be a reusable component, so let's create it the same way we did with `D3Arc`

`@/components/d3/D3Pie.vue`

```html
<template>
    <path fill="none"
          stroke="white"
          stroke-width="5"
          d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z" />
</template>

<script>
export default {}
</script>
```