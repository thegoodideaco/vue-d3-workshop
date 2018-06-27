<template>
    <fieldset class="value-slider">
        <label :for="name">{{name}}: {{value}}</label>
        <input type="range"
               v-bind="$props"
               @input="$emit('input', $event.target.value)">
    </fieldset>
</template>

<script>
import * as d3 from 'd3'

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
    },
    domain: {
      type: Array,
      default() {
        return [0, 500]
      }
    }
  },

  computed: {
    scale() {
      return d3
        .scaleLinear()
        .domain([this.min, this.max])
        .range(this.domain)
    },

    scaledValue() {
      return this.scale(this.value)
    }
  }
}
</script>
