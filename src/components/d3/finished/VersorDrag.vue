<template>
  <!-- SVG Display -->
  <svg @mousedown.prevent.left="startDrag"
       class="no-select"
       fill="white">
    <rect width="100%"
          height="100%"
          x="-50%"
          y="-50%"
          fill="#203243" />
    <path fill="#1cdd87"
          :d="d" />
    <rec></rec>
  </svg>

</template>

<script>
import * as d3 from 'd3-geo'
import * as topojson from 'topojson-client'
import versor from 'versor'
import dataset from '@data/geo/110m.json'

const land = topojson.feature(dataset, dataset.objects.land)

export default {
  data() {
    return {
      options: [
        'geoAzimuthalEquidistant',
        'geoAzimuthalEqualArea',
        'geoGnomonic',
        'geoOrthographic',
        'geoStereographic',
        'geoConicConformal',
        'geoConicEqualArea',
        'geoConicEquidistant',
        'geoEquirectangular',
        'geoMercator',
        'geoTransverseMercator'
      ],
      // Mousedata represents the mouse vector, rotation, and quaternion to use within versor
      mouseData: {
        v: null,
        r: null,
        q: null
      },
      mousePosition: {
        x: null,
        y: null
      },
      origin: {
        x: null,
        y: null
      },
      offset: {
        x: null,
        y: null
      },
      projection: d3
        // .geoAzimuthalEquidistant()
        // .geoAzimuthalEqualArea()
        // .geoGnomonic()
        // .geoOrthographic()
        // .geoStereographic()
        // .geoConicConformal()
        // .geoConicEqualArea()
        // .geoConicEquidistant()
        // .geoEquirectangular()
        // .geoMercator()
        // .geoTransverseMercator()
        .geoNaturalEarth1()
        .translate([0, 0])
        .precision(0.1),
      path: null,
      v0: null, // Mouse position in Cartesian coordinates at start of drag gesture.
      r0: null, // Projection rotation as Euler angles at start.
      q0: null, // Projection rotation as versor at start.,
      v1: null, // Mouse position in Cartesian coordinates at start of drag gesture.
      r1: null, // Projection rotation as Euler angles at start.
      q1: null, // Projection rotation as versor at start.,
      d: null
    }
  },
  props: {
    projectorType: {
      type: String,
      default: 'geoTransverseMercator'
    }
  },
  beforeMount() {
    this.path = d3.geoPath().projection(this.projection)

    this.d = this.path(land)
  },
  watch: {
    projectorType: {
      handler(val) {
        this.projection = this.realProjection
        if (this.r1) {
          this.projection.rotate(this.r1)
        }
        this.path = d3.geoPath().projection(this.projection)
        this.d = this.path(land)
      },
      immediate: true
    }
  },
  methods: {
    startDrag(event) {
      // Set the mouse position from start
      this.offset = this.$el.getBoundingClientRect()

      this.mousePosition = {
        x: event.clientX - this.offset.x,
        y: event.clientY - this.offset.y
      }

      // d3.geoProjection().

      // Set the mouse data
      this.v0 = versor.cartesian(
        this.projection.invert([this.mousePosition.x, this.mousePosition.y])
      )
      this.r0 = this.projection.rotate()
      this.q0 = versor(this.r0)

      // Add the window event listeners
      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.onDragEnd)
    },
    onDrag(event) {
      this.mousePosition.x = event.clientX - this.offset.x
      this.mousePosition.y = event.clientY - this.offset.y

      this.v1 = versor.cartesian(
        this.projection
          .rotate(this.r0)
          .invert([this.mousePosition.x, this.mousePosition.y])
      )
      this.q1 = versor.multiply(this.q0, versor.delta(this.v0, this.v1))
      this.r1 = versor.rotation(this.q1)

      this.projection.rotate(this.r1)

      this.d = this.path(land)
    },
    onDragEnd(event) {
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.onDragEnd)
    }
  },
  computed: {
    realProjection() {
      return d3[
        // .geoAzimuthalEquidistant()
        // .geoAzimuthalEqualArea()
        // .geoGnomonic()
        // .geoOrthographic()
        // .geoStereographic()
        // .geoConicConformal()
        // .geoConicEqualArea()
        // .geoConicEquidistant()
        // .geoEquirectangular()
        // .geoMercator()
        // .geoTransverseMercator()
        this.projectorType
      ]()
        .translate([0, 0])
        .precision(0.1)
    },
    realPath() {
      return d3.geoPath().projection(this.realProjection)
    },
    realD() {
      return this.realPath(land)
    }
  }
}
</script>

<style scoped lang="scss">
.fill {
  width: 100%;
  height: 100%;
}

.no-select {
  user-select: none;
  // overflow: hidden;
}
</style>
