<template>
  <svg v-if="paths">
    <d3-arc v-for="(item, key) in paths"
            :key="key"
            :fill-color="colors(paths.length)[key]"
            :start-angle="item.startAngle"
            :end-angle="item.endAngle"
            :pad-angle="item.padAngle"
            :inner-radius="innerRadius"
            :outer-radius="outerRadius"
            :corner-radius="cornerRadius">

      <template slot-scope="{centroid}">
        <slot v-bind="{item, key, centroid, color: colors(paths.length)[key]}">
        </slot>
      </template>

    </d3-arc>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import D3Arc from './D3Arc.vue'
import * as d3 from 'd3-shape'
import { Pie } from 'd3-shape'
import * as chroma from 'chroma-js'

export default Vue.extend({
  name: 'Pie-Chart',
  components: {
    D3Arc
  },
  props: {
    inputDatum: {
      type: Array,
      default() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    index: {
      type: Number,
      default: 0
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: Math.PI * 2
    },
    padAngle: {
      type: Number,
      default: 0
    },
    innerRadius: {
      type: Number,
      default: 200
    },
    outerRadius: {
      type: Number,
      default: 300
    },
    cornerRadius: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pieGenerator(): Pie<any, any> {
      return d3
        .pie()
        .startAngle(this.startAngle)
        .endAngle(this.endAngle)
        .padAngle(this.padAngle)
    },
    paths(): any[] {
      if (this.inputDatum) {
        return this.pieGenerator(this.inputDatum)
      } else {
        return []
      }
    }
  }
})
</script>
