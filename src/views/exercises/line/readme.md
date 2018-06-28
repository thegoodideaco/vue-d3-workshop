# Excercise #1

## `Using D3 within Vue`

For this Excecise, we will be using `D3-Scale` and Vue's `Reactivity System` to
construct a `Dynamic Range Slider`.

Let's make a range slider that we can use, to dynamically change some
properties. These properties will tie directly into components that we will make
in the next excercise.

### Creating the component

Let's start by creating a component called `ValueSlider`

`ValueSlider.vue`

```html
<template></template>

<script>
export default {}
</script>
```

With a typical HMTL standard slider input, we can have min, max, steps and
value. Let's create the markup for a slider input element

```html
<template>
    <fieldset class="value-slider">
        <label for="slider">Slider</label>
        <input type="range"
               name="slider"
               min="0"
               max="100"
               value="20"
               step="1">
    </fieldset>
</template>
```

Now, we need to bind these values to some reactive objects within our vue
component. We also want to treat this as a component that takes a v-model
directive. In this case we will use Vue's `model` property

```html
<template>
    <fieldset class="value-slider">
        <label :for="name">{{name}}: {{value}}</label>
        <input type="range"
               :name="name"
               :min="min"
               :max="max"
               :step="step"
               :value="value"
               @input="$emit('input', $event.target.value)">
    </fieldset>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 50
    }
  }
}
</script>
```

_**Note:** Vue DevTools prints out events, and since we are using the input
event, this will fire off many many times. I would reccomend filtering, or
pausing events if the steps are very granular._

We can simplify our bindings with `v-bind` and `$props`

```html
<template>
    <fieldset class="value-slider">
        <label :for="name">{{name}}: {{value}}</label>
        <input type="range"
               v-bind="$props"
               @input="$emit('input', $event.target.value)">
    </fieldset>
</template>
```

### Meet `D3-Scale`

D3-Scale allows you to map a range of inputs to a domain of different values.
This can be morethan just Linear. Similar to an ease function, this reads an
input value, and returns a new value based on the range and domain that is
specified

Let's add this functionality to our component. This way we can have it control
both, allowing us to modify what the value is on two different scales

```html

```
