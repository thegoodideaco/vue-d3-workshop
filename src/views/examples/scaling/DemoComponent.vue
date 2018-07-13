<template>
  <div>
    Hello
  </div>
</template>

<script>
import * as scale from 'd3-scale'
import * as scaleColor from 'd3-scale-chromatic'

const interpolator = t => console.log(t)
export default {
  data() {
    return {
      scales: {
        linear: scale.scaleLinear(),
        pow: scale.scalePow(),
        point: scale.scalePoint(),
        threshold: scale.scaleThreshold(),
        ordinal: scale.scaleOrdinal(),
        band: scale.scaleBand(),
        point: scale.scalePoint(),
        sqrt: scale.scaleSqrt(),
        quantize: scale.scaleQuantize(),
        quantile: scale.scaleQuantile(),
        sequential: scale.scaleSequential(interpolator),
        log: scale.scaleLog(),
        time: scale.scaleTime()
      }
    }
  }
}
</script>
