<template>
  <div>
    Coolio
  </div>
</template>

<script>
import {
  scalePoint,
  scaleSequential,
  scaleQuantize,
  scaleQuantile,
  scaleTime,
  scaleThreshold,
  scaleOrdinal
} from 'd3-scale'
export default {
  data() {
    return {
      scales: {
        scalePoint,
        scaleSequential,
        scaleQuantize,
        scaleQuantile,
        scaleTime,
        scaleThreshold,
        scaleOrdinal
      }
    }
  }
}
</script>

<style>
</style>
