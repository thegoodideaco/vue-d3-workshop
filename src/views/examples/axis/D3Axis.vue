<template>
  <g>
    <g v-for="(item, index) in ticks" :key="index" :transform="transform(item)">
      <slot v-bind="item">
        <text text-anchor="end" dominant-baseline="central">{{ item }}</text>
      </slot>
    </g>
  </g>
</template>

<script>
import * as scale from 'd3-scale'
import {format} from 'd3'

// Default Imports of D3-Axis

export default {
  props: {
    scale: {
      type:    Function,
      default: scale
        .scaleLinear().nice()
        .tickFormat(this.tickAmount, 's')
        .range([0, 100])
        .domain([0, 100])
    },
    tickAmount: {
      type:    Number,
      default: 5
    }
  },
  computed: {
    ticks() {
      return this.scale.nice().ticks(this.tickAmount)
    }
  },
  methods: {
    transform(tick) {
      return `translate(-40 ${this.scale(tick)})`
    }
  }
}
</script>

<style></style>
