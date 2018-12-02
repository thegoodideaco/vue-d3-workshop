# Making Dots

## So, what is a SVG

SVG's are basically HTML DOM Elements, that behave like HTML DOM elements, but
have some extra functionality. They are mainly used to draw vector images, which
is a fancy way of saying shapes created with math functions.

Let's setup our component to have a `SVG` as it's template. We will then use the
`circle` element tag to visualize some data

```html
<!-- Empty component with SVG template -->
<template>
  <svg>
    <circle r="50"
            fill="#fff" />
  </svg>
</template>

<script>
export default {}
</script>
```

### Let's draw some dots

For this exercise, we will use a simple dataset, containing a collection of x
and y coordinates. These have been created already, so let's go ahead and import
them

```html
<template>
  <svg>
    <circle r="10"
            v-for="(item, index) in dataset"
            :cx="item[0]"
            :cy="item[1]"
            :key="index"
            fill="#fff" />
  </svg>
</template>

<script>
import dataset from './dataset.json'
export default {
  data() {
    return {
      dataset
    }
  }
}
</script>
```

### Adding Interactivity

Now that we have the dots plotted, let's introduce some functionality when they
are interacted with. For a simple use case, let's `log` the item being clicked

```html
<template>
  <svg>
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
import dataset from './dataset.json'
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
  }
}
</script>
```

### Summary

So what we've done above, is we've created a reactive environment for ourselves,
that will automatically update the positioning of our dots based on the dataset
provided.

We can scale this component by adding more computations that allow for different
ways of visualizing whatever data we want to see. This gives us a way to create
base components, which can be reusable in certain circumstances, or for
composing different visuals, such as dashboards that show multiple dimensions of
a dataset at any given time.
