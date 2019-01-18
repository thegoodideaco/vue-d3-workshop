<template>
  <div class="main-demo fill"
       ref="container">

    <div class="controls">
      <h3>Controls</h3>
      <div class="controls__inner">

        <!-- Grid Toggle -->
        <check-box v-model="displayGrid">
          Grid: {{displayGrid ? 'ON' : 'OFF'}}
        </check-box>

        <!-- Zoom Information -->
        <div>
          <h4>Transformation</h4>
          <small>Zoom: {{transform.k | formatted}}</small>
          <small>Pan: {{transform.x | formatted}} x {{transform.y | formatted}}</small>
        </div>
        <button @click="reset">Reset</button>
      </div>
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
                :axis-display="['bottom', 'left']"
                :show-grid="displayGrid">

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
import CheckBoxVue from '@/components/base/CheckBox.vue'
const formatter = format('~s')
export default {
  mixins: [bounds],
  data() {
    return {
      // range:  [[0, 100], [0, 500]],
      domain:    [[0, 1000], [0, 800]],
      transform: {
        k: 1,
        x: 0,
        y: 0
      },
      displayGrid: false
    }
  },
  computed: {
    tickAmount() {
      return Math.max(3, Math.floor(this.dimensions.width / 90))
    }
  },
  components: {
    PanZoom:  indexVue,
    CheckBox: CheckBoxVue
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
        k: 1,
        x: 0,
        y: 0
      }).eventCallback = type => {
        console.log('type', type)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.main-demo {
  display: grid;
  grid: 100px 1fr / 100%;
  row-gap: 20px;
  position: absolute;
  top: 0;
  left: 50px;
  bottom: 50px;
  right: 10px;
  width: auto;
  height: auto;

  .controls {
    padding: 20px 40px;
    background-color: rgba(#000, 0.25);

    display: grid;
    grid: auto / 150px 1fr;
    column-gap: 20px;
    align-items: center;

    > h3 {
      padding: 10px 25px;
    }

    &__inner {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      > * {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
          margin-left: auto;
        }
      }
    }
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
