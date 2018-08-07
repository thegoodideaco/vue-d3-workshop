<template>
  <div class="fill">

    <svg>
      <g class="edges">
        <line v-for="(item, index) in links"
              :key="index"
              :x1="item.source.y"
              :y1="item.source.x"
              :x2="item.target.y"
              :y2="item.target.x"
              stroke="#fff"
              :stroke-width="item.target.height + 1"></line>
      </g>
      <g class="nodes">
        <d3-hierarchy-node v-for="(item, index) in descendants" :key="index + 'g'" :node-data="item" layout-type="cluster" >
          
        </d3-hierarchy-node>
        <circle v-for="(item, index) in descendants"
                :key="index"
                :cx="item.y"
                :cy="item.x"
                r="5"
                :stroke="getNodeColor(item)"
                stroke-width="2"
                :fill="getNodeColor(item)">
          <title>{{item.data.name}}</title>
        </circle>
      </g>

    </svg>
  </div>

</template>

<script>
import * as d3 from 'd3-hierarchy'
import * as shapes from 'd3-shape'
import * as scale from 'd3-scale'
import * as collection from 'd3-array'
import chroma from 'chroma-js'

import D3HierarchyNode from '@/components/d3/finished/D3HierarchyNode'

export default {
  components: {
    D3HierarchyNode
  },
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
      return d3.tree().size(this.size.reverse())
      // .nodeSize()
    },
    descendants() {
      if (this.root) return this.root.descendants()
    },
    links() {
      if (this.root) return this.root.links()
    },
    linkPaths() {
      if (this.links) {
        return this.links.map(v => {
          return shapes
            .linkHorizontal()
            .source(v => v.source)
            .target(v => v.target)(v)
        })
      }
    }
  },
  beforeMount() {
    if (this.vData) {
      this.$nextTick(() => {
        const bounds = this.$el.querySelector('svg').getBoundingClientRect()
        this.size = [bounds.width, bounds.height]
        this.dataset = this.vData
      })
    } else {
      this.$http.get('/static/demo_data/hierarchy/flare.json').then(res => {
        this.$nextTick(() => {
          const bounds = this.$el.querySelector('svg').getBoundingClientRect()
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
          // .sum(v => v.size)
          // .sort((a, b) => b.size - a.size)
          // .count()
          this.root = this.clusterLayout(this.root)
        }
      },
      immediate: true
    }
  },
  methods: {
    getNodeColor(item) {
      // return a color depending if this is a leaf or not
      if(item.data.leaf){
        return 'green'
      }else{
        return '#fff'
      }
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
}
</style>