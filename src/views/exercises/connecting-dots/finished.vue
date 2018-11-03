<template>
  <svg>
    <path stroke="rgba(255, 255, 255, 0.5)"
          fill="none"
          stroke-width="5"
          :d="d" />
    <circle r="10"
            v-for="(item, index) in dataset"
            :cx="item[0]"
            :cy="item[1]"
            :key="index"
            fill="#fff"
            @click="onClick(item)" />
  </svg>
</template>

<script>
import * as d3 from 'd3-shape'
import _ from 'lodash/shuffle'
import dataset from './dataset'
export default {
  data() {
    return {
      dataset,
      curve: 'curveStepAfter'
    }
  },
  methods: {
    onClick(item) {
      console.log('this is the item!', item)
      this.curve =
        this.curve === 'curveStepAfter' ? 'curveStepBefore' : 'curveStepAfter'

      // Let's flip the data just cause!
      this.dataset = _.shuffle(this.dataset)
    }
  },
  computed: {
    lineGenerator() {
      return d3
        .line()
        .curve(d3[this.curve])
        .x(v => v[0])
        .y(v => v[1])
    },
    d() {
      return this.lineGenerator(this.dataset)
    }
  }
}
</script>

<style scoped lang="scss">
path,
circle {
  transition: all 500ms ease;
}
</style>