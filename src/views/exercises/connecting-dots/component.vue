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
        .curve(d3.curveStepAfter)
        .x(v => v[0])
        .y(v => v[1])
    },
    d() {
      return this.lineGenerator(this.dataset)
    }
  }
}
</script>