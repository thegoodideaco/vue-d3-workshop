<template>
  <svg>
    <g class="edges">
      <line v-for="(item, index) in links"
            :key="index"
            :x1="item.source.x"
            :y1="item.source.y"
            :x2="item.target.x"
            :y2="item.target.y"
            stroke="#fff"
            :stroke-width="item.target.height + 1"></line>
    </g>
    <g class="nodes">
      <circle v-for="(item, index) in descendants"
              :key="index"
              :cx="item.x"
              :cy="item.y"
              r="5"
              stroke="#fff"
              stroke-width="2"
              fill="green" >
              <title>{{item.data.name}}</title>
              </circle>
    </g>

  </svg>

</template>

<script>
import * as d3 from 'd3-hierarchy'
import * as scale from 'd3-scale'
import * as collection from 'd3-array'
import chroma from 'chroma-js'

export default {
  data() {
    return {
      dataset: null,
      size: [500, 500],
      theme: 'Spectral',
      root: null
    }
  },
  props: {
    vData: {
      type: Array
    }
  },
  computed: {
    clusterLayout() {
      return d3.cluster().size(this.size)
      // .nodeSize([5, this.size[1] / this.root.height])
    },
    descendants() {
      if (this.root) return this.root.descendants()
    },
    links() {
      if (this.root) return this.root.links()
    }
  },
  beforeMount() {
    if (this.vData) {
      this.$nextTick(() => {
        const bounds = this.$el.getBoundingClientRect()
        this.size = [bounds.width, bounds.height]
        this.dataset = this.vData
      })
    } else {
      this.$http.get('/static/demo_data/hierarchy/flare.json').then(res => {
        this.$nextTick(() => {
          const bounds = this.$el.getBoundingClientRect()
          this.size = [bounds.width, bounds.height]
          this.dataset = res.data
        })
      })
    }
  },
  watch: {
    dataset: {
      handler(val) {
        if (val) {
          this.root = d3.hierarchy(this.dataset)
          this.root = this.clusterLayout(this.root)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  transform: translateY(-50%) translateX(-50%);
}
</style>