# Composing a Pie Chart

Since SVG's can nest elements, we can use that to construct a pie chart using
the `Arc Component` we just made. This matches perfectly with Vue's Nestable
Component Pattern. So let's do exactly that. This will also be a reusable
component, so let's create it the same way we did with `D3Arc`

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

## Adding D3Arc

Let's import the Arc component we just made, as well as `d3`, and put it into
our template

**Note: Notice how we have created the g element. This is short for group, and
since we will have multiple arcs, this component will represent a group of
paths**

```html
<template>
  <g>
    <d3-arc/>
  </g>
</template>

<script>
import * as d3 from 'd3'
import D3Arc from './finished/D3Arc'
export default {
  components: {
    D3Arc
  }
}
</script>
```

## Enter D3 Pie Layouts

I call these layouts, however they are classified as shapes in the D3 library. I reference them this way because they are used to generate multiple paths, not an individual path definition. Let's add it!

```html
<!-- Create Pie Generator -->
```