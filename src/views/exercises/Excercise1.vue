<template>
    <div>
        <value-slider name="xVal"
                      v-model.number="xVal"
                      :min="range[0]"
                      :max="range[1]" />

        <p>Scaled Value: {{xScaled}}</p>
        <p>Scale Root: {{scaleRoot}}</p>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data() {
    return {
      xVal: 20,
      range: [0, 100]
    }
  },
  computed: {
    scaleGenerator() {
      const gen = d3
        .scaleLinear()
        .rangeRound([-1000, 9383374])
        .domain(this.range)
      return gen
    },
    xScaled() {
      return this.scaleGenerator(this.xVal)
    },
    scaleRoot() {
      if (this.xScaled) {
        return Math.sqrt(this.xScaled)
      }
    }
  },
  components: {
    ValueSlider: () => import('@/components/base/ValueSlider')
  }
}
</script>

<style>
</style>
