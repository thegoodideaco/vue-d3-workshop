<template>
  <div class="scale-display">
    <value-slider v-model.number="input"
                  :min="dataDomain[0]"
                  :max="dataDomain[1]"
                  :step="1"
                  round
                  name="domain" />

    <value-slider v-model.number="output"
                  :min="rangeExtent[0]"
                  :max="rangeExtent[1]"
                  :step="1"
                  round
                  name="range" />

    <!-- <p>Output: {{output | rounded}}</p> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ScaleContinuousNumeric } from 'd3-scale'
import ValueSliderVue from '@/components/base/ValueSlider.vue'
import _ from 'lodash'
import { extent } from 'd3'
export default {
  inject: ['dataset'],
  data() {
    return {
      input: 5,
      range: [1, 10, 40, 50, 7]
    }
  },
  filters: {
    rounded(val) {
      return _.round(val, 3)
    }
  },
  // mounted() {
  //   const { width } = this.$el.getBoundingClientRect()
  //   this.range = [0, width]
  // },
  props: {
    scaleClass: Function,
    clamp:      {
      type:    Boolean,
      default: false
    },
    round:  Boolean,
    domain: {
      type: Array,
      default() {
        return [0, 1]
      }
    }
    // range: {
    //   type: Array,
    //   default() {
    //     return [100, 10000]
    //   }
    // }
  },
  components: {
    ValueSlider: ValueSliderVue
  },
  computed: {
    scale() {
      if (this.scaleClass) {
        /** @type {ScaleContinuousNumeric} */
        const scale = this.scaleClass()

        scale.domain(this.domain)

        if (this.round) {
          scale.rangeRound(this.range)
        } else {
          scale.range(this.range)
        }

        scale.clamp(this.clamp)

        return scale
      }
    },
    dataDomain() {
      return extent(this.domain)
    },
    rangeExtent() {
      return extent(this.range)
    },
    output: {
      get() {
        if (isNaN(this.input)) return
        return this.scale(this.input)
      },
      set(val) {
        this.input = this.scale.invert(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$scale-box-size: 250px;
.scale-display {
  width: $scale-box-size;
  height: $scale-box-size;
  position: relative;
  background-color: #fff;
  color: lighten(#000, 4);
  padding: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
}
</style>

