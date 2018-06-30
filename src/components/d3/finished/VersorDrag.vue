<template>
  <div>
    <canvas class="canvas"></canvas>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import versor from 'versor'
import dataset from '@data/geo/110m.json'
export default {
  data() {
    return {
      canvas: null,
      width: 0,
      height: 0,
      context: null,
      topojson,
      versor,
      dataset
    }
  },
  computed: {
    projection() {
      return d3
        .geoMercator()
        .translate([0, 0])
        .precision(0.1)
    },
    land() {
      return topojson.feature(dataset)
    },
    path() {
      return d3.geoPath(this.land).projection(this.projection)
      // .context()
    }
  }
}
</script>

<style>
</style>
