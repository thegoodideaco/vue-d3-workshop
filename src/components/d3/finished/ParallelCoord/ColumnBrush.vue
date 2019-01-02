<template>
  <g class="d3-brush"
     :class="{ brushing: brushing }" />
</template>

<script>
import { brushY } from 'd3-brush'
import * as dSelection from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import _ from 'lodash'
export default {
  props: {
    // raw value extent
    domain: {
      type: Array,
      default() {
        return [0, 1000]
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
      brush:     null,
      selection: null,
      brushing:  false,

      // Debounce updating the model
      debounceFunction: (min, max) => {
        _.debounce(() => {
          this.$emit(
            'input',
            min === max ? null : [min, max].map(v => this.scale(v))
          )
        }, 150)()
      }
    }
  },
  mounted() {
    // Wait until element is rendered
    this.$nextTick(() => {
      // Set selection for brush
      this.selection = dSelection.select(this.$el).call(this.aBrush)
      // move brush to match inital value
      this.aBrush.move(
        this.selection,
        this.value ? this.value.map(v => this.scale(v)) : null
      )
    })
  },
  methods: {
    brushHandler() {
      // eslint-disable-next-line no-unused-vars
      const { selection, type, sourceEvent, brush } = dSelection.event
      // console.log(sourceEvent, type)

      const userInvoked = sourceEvent != null

      // If user is actively brushing
      this.brushing = type !== 'end' && userInvoked

      // If user selects nothing
      if (selection == null) {
        this.$emit('input', null)
        return
      }

      switch (type) {
      case 'start':
        this.$emit('filter:start')
        break
      case 'brush':
        if (this.brushing) {
          this.$emit(
            'input',
            selection.map(v => this.scale.invert(v)).reverse()
          )
        } else {
          console.log('redraw')
          // this.selection = d3.select(this.$el).call(this.aBrush)
          // move brush to match inital value
          // this.aBrush.move(
          //   this.selection,
          //   this.value ? this.value.map(v => v) : null
          // )
        }
        break
      }
    }
  },
  beforeDestroy() {
    this.selection.remove()
    dSelection.select(this.$el).remove()
  },
  computed: {
    scale() {
      return scaleLinear()
        .nice()
        .domain(this.domain)
        .range([this.height, this.y])
    },
    aBrush() {
      return brushY()
        .extent([[this.x, this.y], [this.x + this.width, this.y + this.height]])
        .on('start brush end', this.brushHandler)
    }
  },
  watch: {
    value: {
      handler(val) {
        if (!this.brushing) {
          // move brush to match inital value
          // values are in range of domain values
          this.aBrush.on('start brush end', null)

          this.aBrush.move(
            this.selection,
            val ? val.map(v => this.scale(v)) : null
          )
          // debugger
          this.aBrush.on('start brush end', this.brushHandler)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ rect.selection {
  fill: rgba(#fff, 0.5);
  fill-opacity: 1;
  stroke-width: 0;

  &:hover,
  .brushing & {
    fill: #fff;
  }
}
</style>
