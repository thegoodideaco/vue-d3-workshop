<template>
  <svg class="pan-zoom"
       ref="svg"
       width="100%"
       height="100%">

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
import {
  scaleLinear,
  zoom,
  event,
  // eslint-disable-next-line no-unused-vars
  D3ZoomEvent,
  // eslint-disable-next-line no-unused-vars
  ZoomBehavior,
  zoomIdentity
} from 'd3'
import * as d3 from 'd3'
export default {
  inheritAttrs: false,
  mixins:       [bounds],
  props:        {
    scaleContent: {
      type:    Boolean,
      default: true
    },
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
    },
    zoomTransform: {
      type: Object,
      default() {
        return {
          k: 1,
          x: 0,
          y: 0
        }
      }
    }
  },
  data() {
    return {
      rescaleX:      null,
      rescaleY:      null,
      transformProp: null,
      selection:     null,
      zooming:       false,
      watcher:       null
    }
  },
  computed: {
    scaleX() {
      const s = scaleLinear()
        .domain(this.hDomain)
        .range([0, this.dimensions.width])
        .nice(this.tickAmount)

      return s
    },
    scaleY() {
      return scaleLinear()
        .domain(this.vDomain)
        .range([this.dimensions.height, 0])
        .nice(this.tickAmount)
    },

    /** @returns {ZoomBehavior} */
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
    this.selection = d3.select(this.$el)
    this.zoom.on('zoom', this.onZoom)
    this.zoom.on('start', () => {
      if (this.watcher) this.watcher()
      this.zooming = true
    })
    this.zoom.on('end', () => {
      this.zooming = false
      this.watcher = this.$watch(
        () => {
          return {
            w: this.dimensions.width,
            h: this.dimensions.height,
            k: this.zoomTransform.k,
            x: this.zoomTransform.x,
            y: this.zoomTransform.y
          }
        },
        () => {
          if (this.selection)
            this.zoom.transform(this.selection, this.zoomTransform)
        }
      )
    })

    this.zoom(this.selection)
  },
  beforeDestroy() {
    if (this.watcher) this.watcher()
    this.zoom.on('zoom', null)
  },
  methods: {
    onZoom() {
      /** @type {D3ZoomEvent} */
      const e = event
      if (!e.transform.rescaleX) return
      this.rescaleX = e.transform.rescaleX(this.scaleX)
      this.rescaleY = e.transform.rescaleY(this.scaleY)

      if (this.scaleContent) {
        this.transformProp = {
          transform: e.transform.toString()
        }
      }
      // console.log(e.transform)
      // debugger
      // }

      this.$emit('update:zoomTransform', e.transform)
    },
    reset() {
      this.$emit('update:zoomTransform', zoomIdentity)
    },
    updateZoom() {
      console.log('shoulve updates')
      this.onZoom()
    },
    onResize(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.pan-zoom {
  overflow: visible;
  position: relative;
}

.pan-content {
  clip-path: rect(0 0 0 20px);
}
</style>
