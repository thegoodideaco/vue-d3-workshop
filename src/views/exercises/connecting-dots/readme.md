# Connecting the Dots

## Enter D3-Shape

D3-Shape is one of the data visualization sections of D3. And what it does is
pretty amazing. But first, let's look at a special element called the `<path>`
element.

```html
<svg>
    <path fill="none" stroke="red"
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z" />
</svg>
```

In this example, the path element has three attributes. `fill` `stroke` and `d`

`fill` and `stroke` both deal with misc styling, but `d` is pretty unique.

`d` stands for _definition_ meaning the path definition. It is a list of
[path commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Path_commands)
where each command is made of a letter and some numbers representing the
parameter of the command.

In short, the `d` attribute is what _draws_ the shape you want to display

### D3-Shape Transforms The Definition!

What this means, is that D3 can actually generate a path based on the values you
give it. Let's do this with our current dataset we are displaying, and turn this
area of dots into a more uniform line graph, using `D3.line`

```html
<template>
  <svg>
    <path stroke="#fff"
          fill="none"
          stroke-width="5"
          :d="d" />
    <circle r="20"
            v-for="(item, index) in dataset"
            :cx="item[0]"
            :cy="item[1]"
            :key="index"
            fill="#fff"
            @click="onClick(item)" />
  </svg>
</template>

<script>
import * as d3 from 'd3'
import dataset from './dataset'
export default {
  data() {
    return {
      dataset
    }
  },
  methods: {
    onClick(item) {
      console.log('this is the item!', item)
    }
  },
  computed: {
    lineGenerator() {
      return d3
        .line()
        .x(v => v[0])
        .y(v => v[1])
    },
    d() {
      return this.lineGenerator(this.dataset)
    }
  }
}
</script>
```

### Summary

With a couple of additions, we were able to introduce some core D3-Shape functionality using the `line` shape. We were also able to leverage Vue's template to render the D3 data to a path element, and we still have our reactive system managing all of the new functionality