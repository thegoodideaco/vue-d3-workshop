<template>
  <g class="d3-brush"
     :class="{brushing: brushing}">

  </g>
</template>

<script>
import { brushY } from 'd3-brush'
import * as d3 from 'd3-selection'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import _ from 'lodash'
export default {
  props: {
    domain: Array,
    range: Array,
    scale: {
      type: Function,
      default() {
        return scaleLinear()
      }
    },

    /** @type [number, number] */
    value: Array,

    width: {
      type: Number,
      default: 20
    },

    height: {
      type: Number,
      default: 500
    }
  },
  model: {
    event: 'input',
    prop: 'value'
  },
  data() {
    return {
      brush: brushY(),
      selection: null,
      brushing: false,
      moving: false,
      debounceFunction: (min, max) => {
        _.debounce(() => {
          this.$emit('input', min === max ? null : [min, max])
        }, 50)()
      }
    }
  },
  mounted() {
    /** @type ScaleLinear<number, number> */
    const { range, domain } = this.scale

    const r = range()
    const d = domain()

    this.brush
      .extent([[0, Math.min(...r)], [this.width, Math.max(...r)]])
      .on('start', () => {
        if (this.moving) {
          return
        }
        this.brushing = true
      })
      .on('brush', () => {
        if (this.moving) {
          return
        }

        /**
         * Gives us the extent
         * @type [number, number] | undefined
         */
        const s = d3.event.selection

        /** @type ScaleLinear */
        const myScale = this.scale

        // !If there is no selection, return none
        if (s == null) {
          console.log('none')
        } else {
          /** @type [number, number] */
          const [min, max] = s.map(v => {
            return myScale.invert(v)
          })

          // ? Emit the new extent value
          this.debounceFunction(min, max)
        }
      })
      .on('end', () => {
        if (this.moving) {
          this.moving = false
          return
        }

        /**
         * Gives us the extent
         * @type [number, number] | undefined
         */
        const s = d3.event.selection

        this.brushing = false

        if (s == null) {
          this.$emit('input', null)
        }
      })

    this.selection = d3.select(this.$el).call(this.brush)
    this.brush.move(
      this.selection,
      this.value ? this.value.map(v => this.scale(v)) : null
    )
  },
  beforeDestroy() {
    d3.select(this.$el).remove()
  },
  watch: {
    value: {
      /**
       * @param {[number, number] | null} val
       */
      handler(val) {
        if (this.brushing || val == null) {
          return
        }
        this.moving = true
      }
    },
    height: {
      handler(val) {
        const [a, b] = this.brush.extent()()
        // console.log(e) this.brush = brushY()

        /** @type ScaleLinear<number, number> */
        const { range, domain } = this.scale

        const r = range()
        const d = domain()

        this.brush = brushY()
          .extent([[0, Math.min(...r)], [this.width, Math.max(...r)]])
          .on('start', () => {
            if (this.moving) {
              return
            }
            this.brushing = true
          })
          .on('brush', () => {
            if (this.moving) {
              return
            }

            /**
             * Gives us the extent
             * @type [number, number] | undefined
             */
            const s = d3.event.selection

            /** @type ScaleLinear */
            const myScale = this.scale

            // !If there is no selection, return none
            if (s == null) {
              console.log('none')
            } else {
              /** @type [number, number] */
              const [min, max] = s.map(v => {
                return myScale.invert(v)
              })

              // ? Emit the new extent value
              this.debounceFunction(min, max)
            }
          })
          .on('end', () => {
            if (this.moving) {
              this.moving = false
              return
            }

            /**
             * Gives us the extent
             * @type [number, number] | undefined
             */
            const s = d3.event.selection

            this.brushing = false

            if (s == null) {
              this.$emit('input', null)
            }
          })

        this.selection = d3.select(this.$el).call(this.brush)
        this.brush.move(
          this.selection,
          this.value ? this.value.map(v => this.scale(v)) : null
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
// .d3-brush {
/deep/ rect.overlay {
  fill: rgba(#fff, 0.5);
}
/deep/ rect.selection {
  fill: rgba(#fff, 0.5);
  fill-opacity: 1;
  stroke-width: 0;

  &:hover,
  .brushing & {
    fill: #fff;
  }
}
// }
</style>
