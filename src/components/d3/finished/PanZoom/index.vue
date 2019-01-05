<template>
  <svg class="pan-zoom"
       ref="svg"
       v-bind="dimensions">

    <scale-ticks :scale="scaleY"
                 :count="tickAmount" />

    <scale-ticks :scale="scaleY"
                 position="right"
                 :transform="`translate(${dimensions.width} 0)`"
                 :count="tickAmount" />

    <scale-ticks :scale="scaleX"
                 position="bottom"
                 :transform="`translate(0 ${dimensions.height})`"
                 :count="tickAmount" />

    <scale-ticks :scale="scaleX"
                 position="top"
                 :count="tickAmount" />
  </svg>
</template>

<script>
import bounds from '@/utils/mixins/bounds.js'
import ScaleTicks from './ScaleTicks.vue'
import { scaleLinear } from 'd3'
export default {
  mixins: [bounds],
  props:  {
    hDomain: {
      type:     Array,
      required: true
    },
    vDomain: {
      type:     Array,
      required: true
    },
    tickAmount: Number
  },
  computed: {
    scaleX() {
      return scaleLinear()
        .domain(this.hDomain)
        .range([0, this.dimensions.width])
    },
    scaleY() {
      return scaleLinear()
        .domain(this.vDomain)
        .range([this.dimensions.height, 0])
    }
  },
  components: {
    ScaleTicks
  }
}
</script>

<style scoped lang="scss">
.pan-zoom {
  overflow: visible;
}
</style>
