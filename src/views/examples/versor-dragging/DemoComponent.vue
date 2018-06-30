<template>
  <div>
    <canvas ref="canvas" width="1000" height="1000"></canvas>
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
      width: 100,
      height: 100,
      context: null,
      land: null,
      topojson,
      versor,
      dataset
    }
  },
  computed: {
    projection() {
      return d3
        .geoMercator()
        .translate([this.width / 2, this.height / 2])
        .precision(0.1)
    },
    path() {
      if (this.land && this.context) {
        return d3
          .geoPath(this.land)
          .projection(this.projection)
          // .context(this.context)
      }
      // .context()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.canvas = d3.select(this.$refs.canvas)
      this.width = this.canvas.property('width')
      this.height = this.canvas.property('height')
      this.context = this.canvas.node().getContext('2d')

      // Set land
      this.land = topojson.feature(dataset, dataset.objects.land)

      // render it in canvas
      this.context.fillStyle = '#fff'
      this.context.fillRect(0, 0, this.width, this.height)

      this.context.beginPath()
      this.path(this.land)
      this.context.fillStyle = '#000'
      this.context.fill()
    })
  }
}
</script>

<style>
</style>
