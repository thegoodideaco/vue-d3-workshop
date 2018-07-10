<template>
  <div class="fill">
    Hey There
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data() {
    return {
      dataset: d3.bund
    }
  },
  beforeCreate() {
    d3.json('/static/demo_data/quantifiable/populations.json').then(res => {
      this.dataset = res
    })
  }
}
</script>

<style scoped>
.fill {
  height: 100%;
}
</style>
