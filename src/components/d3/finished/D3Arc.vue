<template>
  <g>
    <!-- Arc -->
    <path class="arc-path"
          :fill="fillColor"
          :d="d" />

    <!-- Centroid -->
    <g class="centroid"
       v-if="$slots.default"
       :transform="trans">
      <slot v-bind="{centroid}">
        <text>centroid</text>
      </slot>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3-shape'
export default {
  props: {
    fillColor: {
      type:    String,
      default: '#fff'
    },
    innerRadius: {
      type:    Number,
      default: 200
    },
    outerRadius: {
      type:    Number,
      default: 300
    },
    cornerRadius: {
      type:    Number,
      default: 0
    },
    startAngle: {
      type:    Number,
      default: 0
    },
    endAngle: {
      type:    Number,
      default: 2
    },
    padAngle: {
      type:    Number,
      default: 0
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
        .padAngle(this.padAngle)
    },
    d() {
      return this.arcGenerator()
    },
    centroid() {
      if (this.arcGenerator) {
        const cen = this.arcGenerator.centroid()
        const radians =
          this.startAngle + (this.endAngle - this.startAngle) * 0.5

        return {
          x:       cen[0],
          y:       cen[1],
          radians,
          degrees: (radians / Math.PI) * 180
        }
      }
    },
    trans() {
      if (this.arcGenerator) {
        const centroid = this.arcGenerator.centroid()

        return `translate(${centroid[0]}, ${centroid[1]})`
      }
    }
  },
  watch: {
    centroid: {
      handler(val) {
        this.$emit('update:centroid', val)
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.arc-path {
  &:hover {
    stroke: #fff;
    stroke-width: 5;
    cursor: pointer;
  }
}
</style>
