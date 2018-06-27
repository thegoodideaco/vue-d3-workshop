<template>
    <div class="svg-container">
        <svg width="100%"
             height="100%">
            <g transform="translate(-100 -100)">
                <circle v-for="(item, index) in dataset"
                        :key="index"
                        r="5"
                        :cx="xPos(item[0])"
                        :cy="item[1]" />
            </g>
        </svg>
    </div>
</template>

<script>
import * as d3 from 'd3-scale'
import dataset from '@data/quantifiable/simple/lineData.json'
export default {
  data() {
    return {
      size: [0, 400],
      dataset: dataset.sort((a, b) => a[0] - b[0])
    }
  },
  computed: {
    xPos() {
      return d3
        .scaleLinear()
        .domain([this.dataset[0][0], this.dataset[this.dataset.length - 1][0]])
        .range(this.size)
    }
  }
}
</script>

<style scoped lang="scss">
.svg-container {
  background-color: blue;
  width: 100%;
  height: 100%;
}
svg {
  transform: translate3d(50%, 50%, 0);
  overflow: visible;
}
circle {
  fill: #fff;
  transition: all 500ms ease;
}
</style>
