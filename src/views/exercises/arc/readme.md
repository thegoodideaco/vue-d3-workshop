# Creating an Arc

So, just like `line`, Arc is another shape that D3 offers. The same patterns
apply, but with different properties. Some of this deals with trigonometry, but
for the most part, D3 will take care of the hard parts.

One thing to note, is that both `line` and `arc` are both considered pieces of a
`shape layout`, such as `Pie` and `Area`, which combine arcs and lines together
into one shape. The next exercise will cover the composition of these shapes.

## Basic Setup

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

## Defining the properties

There are **5** properties of the arc that can be reactive:

- startAngle
- endAngle
- innerRadius
- outerRadius
- borderRadius

Let's set these up as actual properties of the Vue component itself

```html
<template>
  <path/>
</template>

<script>
export default {
  props: {
    innerRadius: {
      type: Number,
      default: 0
    },
    outerRadius: {
      type: Number,
      default: 100
    },
    cornerRadius: {
      type: Number,
      default: 10
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: 2
    }
  }
}
</script>
```

## Adding D3

Now that we have these props setup, let's implement the arc generator from D3.

```html
<template>
  <path />
</template>

<script>
import * as d3 from 'd3-shape'
export default {
  props: {
    innerRadius: {
      type: Number,
      default: 0
    },
    outerRadius: {
      type: Number,
      default: 300
    },
    cornerRadius: {
      type: Number,
      default: 0
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: 2
    }
  },
  computed: {
    arcGenerator() {
      return d3
        .arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius)
        .cornerRadius(this.cornerRadius)
        .startAngle(this.startAngle)
        .endAngle(this.endAngle)
    },
    d() {
      return this.arcGenerator()
    }
  }
}
</script>
```

## Rendering the Path

Just like `line`, what we will end up getting is another generated path. So now
we just need to include it in our template

```html
<template>
  <path fill="#fff"
        :d="d" />
</template>

<script>
import * as d3 from 'd3-shape'
export default {
  props: {
    innerRadius: {
      type: Number,
      default: 0
    },
    outerRadius: {
      type: Number,
      default: 300
    },
    cornerRadius: {
      type: Number,
      default: 0
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: 2
    }
  },
  computed: {
    arcGenerator() {
      return d3
        .arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius)
        .cornerRadius(this.cornerRadius)
        .startAngle(this.startAngle)
        .endAngle(this.endAngle)
    },
    d() {
      return this.arcGenerator()
    }
  }
}
</script>
```

## Summary

Arc is just one of many different types of shapes that D3 offers, such as
`Links`. With these different shapes, you can generate out the path in a
reactive envronment, matching it very nicely with Vue's Reactivity, and Template
Rendering. This also opens up doors for creating graphics in an external
program, such as Adobe Illustrator, and then simply modifying it within the
template, to produce dots, lines, and anything else that makes up what the core
functionality of what vector rendering is, shapes!
