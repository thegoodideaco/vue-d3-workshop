<template>
  <div ref="svg"
       class="fill">
    Thread Arcs

    <svg>
      <circle v-for="(item, index) in descendants"
              :key="index"
              :cx="item.depth * 20"
              :cy="item.depth * 40 * index"
              fill="#fff"
              r="5">

        <title>work please {{index}}</title>

      </circle>

      <text v-for="(item, tindex) in descendants"
            :key="tindex"
            class="title-text"
            :x="(item.depth * 20) + 15"
            :y="item.depth * 40 * tindex">{{item.data.name}}</text>
    </svg>
  </div>

</template>

<script>
import * as d3 from 'd3-hierarchy'
import * as shapes from 'd3-shape'
import * as scale from 'd3-scale'
import * as collection from 'd3-array'
import { path } from 'd3-path'
import chroma from 'chroma-js'
import _ from 'lodash'

import D3HierarchyNode from '@/components/d3/finished/D3HierarchyNode'

export default {
  components: {
    D3HierarchyNode
  },
  data() {
    return {
      dataset: null,
      size: [500, 500],
      root: null
    }
  },
  props: {
    vData: {
      type: Array
    }
  },
  computed: {
    descendants() {
      if (this.root) {
        return this.root.descendants()
      }
    },
    leaves() {
      if (this.root) {
        return this.root.leaves()
      }
    }
  },
  beforeMount() {
    if (this.vData) {
      this.$nextTick(() => {
        const bounds = this.$refs.svg.getBoundingClientRect()
        this.size = [bounds.width, bounds.height]
        this.dataset = this.vData
      })
    } else {
      this.$http.get('/static/demo_data/hierarchy/edisco.json').then(res => {
        this.$nextTick(() => {
          const bounds = this.$refs.svg.getBoundingClientRect()
          this.size = [bounds.width, bounds.height]
          this.dataset = res.data[0]
        })
      })
    }
  },
  watch: {
    dataset: {
      handler(val) {
        if (val) {
          this.root = d3.hierarchy(this.dataset).count()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.fill {
  width: 100%;
  height: 100%;
  padding: 25px;
  position: relative;
}

svg {
  transform: translateY(-50%) translateX(-50%);
  padding: 5px;

  .title-text {
    fill: #fff;
    dominant-baseline: central;
  }
}
</style>