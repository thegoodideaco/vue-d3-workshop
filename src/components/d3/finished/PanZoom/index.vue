<template>
  <svg class="pan-zoom"
       ref="svg"
       v-bind="dimensions">

    <!-- Left -->
    <scale-ticks v-for="item in tickObjects"
                 :key="item.position"
                 v-bind="item">

      <template slot-scope="item2">
        <slot name="tick"
              v-bind="item2"></slot>
      </template>

    </scale-ticks>

    <svg v-if="$slots.default"
    style="overflow: hidden;"
         width="100%"
         height="100%"
         class="pan-content">

      <g v-bind="transformProp">

        <slot></slot>
      </g>
    </svg>
  </svg>
</template>

<script>
import bounds from '@/utils/mixins/bounds.js'
import ScaleTicks from './ScaleTicks.vue'
// eslint-disable-next-line no-unused-vars
import { scaleLinear, zoom, event, D3ZoomEvent } from 'd3'
import * as d3 from 'd3'
export default {
  mixins: [bounds],
  props:  {
    hDomain: {
      type:     Array,
      required: true
    },
    vDomain: {
      type:     Array,
      required: true
    },
    tickAmount:  Number,
    axisDisplay: {
      type: Array,
      default() {
        return ['top', 'left']
      }
    }
  },
  data() {
    return {
      rescaleX:      null,
      rescaleY:      null,
      transformProp: null
    }
  },
  computed: {
    scaleX() {
      return scaleLinear()
        .domain(this.hDomain)
        .range([0, this.dimensions.width])
    },
    scaleY() {
      return scaleLinear()
        .domain(this.vDomain)
        .range([this.dimensions.height, 0])
    },

    /** @returns {D3ZoomEvent} */
    zoom() {
      return zoom()
    },
    tickObjects() {
      return this.axisDisplay.map(v => {
        const scale =
          v === 'left' || v === 'right'
            ? this.rescaleY || this.scaleY
            : this.rescaleX || this.scaleX
        const transform =
          v === 'right'
            ? `translate(${this.dimensions.width} 0 )`
            : v === 'bottom'
              ? `translate(0 ${this.dimensions.height})`
              : null
        return {
          position: v,
          scale,
          count:    this.tickAmount,
          transform
        }
      })
    }
  },
  components: {
    ScaleTicks
  },
  mounted() {
    this.zoom.on('zoom', this.onZoom)
    this.zoom(d3.select(this.$el))
  },
  beforeDestroy() {
    this.zoom.on('zoom', null)
  },
  methods: {
    onZoom() {
      /** @type {D3ZoomEvent} */
      const e = event
      this.rescaleX = e.transform.rescaleX(this.scaleX)
      this.rescaleY = e.transform.rescaleY(this.scaleY)

      this.transformProp = {
        transform: e.transform.toString()
      }
      // console.log(e.transform)
      // debugger
    }
  }
}
</script>

<style scoped lang="scss">
.pan-zoom {
  overflow: visible;
}

.pan-content {
  clip-path: rect(0 0 0 20px);
}
</style>
