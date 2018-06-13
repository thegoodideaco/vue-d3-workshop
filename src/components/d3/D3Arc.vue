<template>
  <g>
    <path :d="d"
          v-bind="$attrs"
          @click="$emit('click', $event)"
          @mouseout="$emit('mouseout', $event)"
          @mouseover="$emit('mouseover', $event)">
      
    </path>
    <slot v-bind="{centroid}"></slot>
  </g>
</template>

<script>
import * as d3 from 'd3'
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
      default: Math.PI * 2
    },

    // Optional, if specified, override all above
    path: {
      type: String
    }
  },
  computed: {
    arc() {
      // Ultamitely this returns a string.
      // if path is specified, just return the path
      // if (this.path) {
      //   this.arc()
      //   return () => this.arc
      // }

      return d3
        .arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius)
        .startAngle(this.startAngle)
        .endAngle(this.endAngle)
        .cornerRadius(this.cornerRadius)
    },
    d() {
      return this.arc()
    },
    centroid() {
      return this.arc.centroid()
    }
  }
}
</script>

<style>
</style>
