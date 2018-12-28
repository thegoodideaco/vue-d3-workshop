<template>
  <g class="d3-brush"
     :class="{ brushing: brushing }" />
</template>

<script>
import { brushY } from 'd3-brush'
import * as d3 from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import _ from 'lodash'
export default {
  props: {
    domain: {
      type: Array,
      default() {
        return [0, 1000]
      }
    },
    range: {
      type: Array,
      default() {
        return [6, this.height || 200]
      }
    },

    /** @type [number, number] */
    value: Array,

    x: {
      type:    Number,
      default: 0
    },

    y: {
      type:    Number,
      default: 0
    },

    width: {
      type:    Number,
      default: 20
    },

    height: {
      type:    Number,
      default: 500
    }
  },
  model: {
    event: 'input',
    prop:  'value'
  },
  data() {
    return {
      brush:            brushY(),
      selection:        null,
      brushing:         false,
      moving:           false,
      debounceFunction: (min, max) => {
        _.debounce(() => {
          this.$emit('input', min === max ? null : [min, max])
        }, 50)()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      /** @type ScaleLinear<number, number> */
      const { range } = this.scale

      const r = range()

      this.brush = brushY()
        .extent([
          [this.x, Math.min(...r)],
          [this.x + this.width, Math.max(...r)]
        ])

        .on('start', () => {
          this.brushing = true
        })
        .on('brush', () => {
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
    })
  },
  beforeDestroy() {
    d3.select(this.$el).remove()
  },
  computed: {
    scale() {
      return scaleLinear()
        .domain(this.domain)
        .range([this.height, this.y])
    }
  },
  watch: {
    value: {
      /**
       * @param {[number, number] | null} val
       */
      handler(val) {
        // this.moving = val != null
        if (this.brushing || val == null) {
          return
        }
        this.moving = true
      },
      deep: true
    },
    height: {
      handler() {
        this.brush.extent([[0, 0], [this.width, this.height]])
        d3.select(this.$el).call(this.brush)
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
