<template>
  <svg @mousedown="startDrag"
       :width="width"
       :height="height">
    <path fill="green"
          :d="d" />

    <circle></circle>
    <rec></rec>
  </svg>

</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import versor from 'versor'
import dataset from '@data/geo/110m.json'
export default {
  data() {
    return {
      projection: d3
        .geoMercator()
        .translate([0, 0])
        .precision(0.1),
      drag: d3.drag(),
      canvas: null,
      width: 100,
      height: 100,
      context: null,
      land: null,
      topojson,
      versor,
      dataset,
      mouseVec: null,
      beginPositions: {
        v: null,
        r: null,
        q: null
      },
      endPositions: {
        v: null,
        r: null,
        q: null
      },
      newD: null
    }
  },
  computed: {
    path() {
      if (this.land) {
        return d3.geoPath(this.land).projection(this.projection)
        // .context(this.context)
      }
      // .context()
    },
    d() {
      if (this.path) {
        return this.path(this.land)
      }
    }
  },
  mounted() {
    // Set land
    this.land = topojson.feature(dataset, dataset.objects.land)
    this.drag.on('start', () => {
      this.beginPositions.v = versor.cartesian(
        this.projection.invert(d3.mouse(this.$el))
      )
      this.beginPositions.r = this.projection.rotate()
      this.beginPositions.q = versor(this.beginPositions.r)
    })

    this.drag.on('drag', () => {})

    this.$nextTick(() => {
      const rect = this.$el.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    })
  },
  methods: {
    startDrag(event) {
      const v = versor.cartesian(
        this.projection.invert([event.clientX, event.clientY])
      )
      const r = this.projection.rotate()
      const q = versor(r)

      this.beginPositions = {
        v,
        r,
        q
      }

      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.onDragFinish)
    },

    onDrag(event) {
      const _x = event.clientX
      const _y = event.clientY

      const v = versor.cartesian(
        this.projection.rotate(this.beginPositions.r).invert([[_x, _y]])
      )
      const q = versor.multiply(
        this.beginPositions.q,
        versor.delta(this.beginPositions.v, v)
      )
      const r = versor.rotation(q)
      this.projection.rotate(r)

      // console.log(this.path(this.land))
      this.newD = this.path(this.land)
    },

    onDragFinish(e) {
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.onDragFinish)
    }
  }
}
</script>

<style scoped lang="scss">
.my-svg-container {
  // width: 100%;
  // height: 100vh;
}
</style>
