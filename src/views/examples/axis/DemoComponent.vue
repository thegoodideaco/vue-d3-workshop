<template>
  <div class="main-demo fill"
       ref="container">

    <div class="controls">
      Controls

      <button @click="reset">Reset</button>
    </div>

    <div class="svg">
      <!-- SVG Entry -->
      <pan-zoom class="panner"
                ref="panzoom"
                :zoom-transform.sync="transform"
                :h-domain="domain[0]"
                :v-domain="domain[1]"
                :scale-content="true"
                :tick-amount="tickAmount"
                :axis-display="['bottom', 'left']">

        <!-- Display a custom tick value -->
        <template slot="tick"
                  slot-scope="d">
          <text>
            {{d.value | formatted}}
          </text>
        </template>

        <circle cx="25"
                cy="25"
                r="20"
                fill="#fff"></circle>

      </pan-zoom>
    </div>

  </div>
</template>

<script>
import indexVue from '@/components/d3/finished/PanZoom/index.vue'
import { format } from 'd3'
import bounds from '@/utils/mixins/bounds.js'
import * as gsap from 'gsap'
const formatter = format('.3s')
export default {
  mixins: [bounds],
  data() {
    return {
      // range:  [[0, 100], [0, 500]],
      domain:    [[0, 1000], [0, 1000]],
      transform: {
        k: 1,
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    tickAmount() {
      return Math.max(3, Math.floor(this.dimensions.width / 100))
    }
  },
  components: {
    PanZoom: indexVue
  },
  filters: {
    formatted(num) {
      return formatter(+num)
    }
  },
  methods: {
    reset() {
      if (gsap.TweenMax.isTweening(this.transform)) {
        return
      }
      gsap.TweenMax.to(this.transform, 1.25, {
        ease: gsap.Power3.easeInOut,
        k:    1
      })
      gsap.TweenMax.to(this.transform, 1.25, {
        ease: gsap.Power3.easeInOut,
        x:    0
      })
      gsap.TweenMax.to(this.transform, 1.25, {
        ease: gsap.Power4.easeInOut,
        y:    0
      })
      // this.$refs.panzoom.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
div.main-demo {
  display: grid;
  grid: auto 1fr / 100%;
  row-gap: 20px;
  position: absolute;
  top: 0;
  left: 50px;
  bottom: 50px;
  right: 10px;
  width: auto;
  height: auto;

  .controls {
    padding: 10px;
    background-color: rgba(#000, 0.25);
  }

  > .svg {
    width: 100%;
    height: 100%;
    // overflow: hidden;
    position: relative;
    .panner {
      border: 1px solid rgba(#fff, 0.5);
    }
  }
}

svg {
  left: auto;
  top: auto;
  width: 100%;
  height: 100%;
}
</style>
