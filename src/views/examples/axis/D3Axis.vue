<template>
  <g>
    <g v-for="(item, index) in ticks"
       :key="index"
       :transform="transform(item)">
      <slot :value="item">
        <text text-anchor="end" dominant-baseline="central">{{item}}</text>
      </slot>
    </g>
  </g>
</template>

<script>
import * as scale from 'd3-scale'

// Default Imports of D3-Axis
const slice = Array.prototype.slice
const identity = x => x

const top = 1
const right = 2
const bottom = 3
const left = 4
const epsilon = 1e-6

export default {
  props: {
    scale: {
      type: Function,
      default: scale
        .scaleLinear()
        // .tickFormat(this.tickAmount)
        .range([0, 100])
        .domain([0, 100])
    },
    tickAmount: {
      type: Number,
      default: 10
    }
  },
  computed: {
    ticks() {
      return this.scale.ticks(this.tickAmount)
    }
  },
  methods: {
    transform(tick) {
      return `translate(-40 ${this.scale(tick)})`
    }
  }
}
</script>

<style>
</style>
