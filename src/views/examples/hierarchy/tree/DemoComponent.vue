<template>
  <div class="fill">
    <div id="curveOptions">
      <select v-model="selectedCurve">
        <option v-for="item in curveOptions" :key="item">{{ item }}</option>
      </select>
    </div>

    <svg>
      <g class="edges">
        <!-- <line v-for="(item, index) in links"
              :key="index"
              :x1="item.source.y"
              :y1="item.source.x"
              :x2="item.target.y"
              :y2="item.target.x"
              stroke="#fff"
              :stroke-width="item.target.height + 1"></line> -->

        <path
          v-for="(link, i) in linkPaths"
          :key="i"
          :d="link"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <g class="nodes">
        <D3HierarchyNode
          v-for="(item, index) in descendants"
          :key="index + 'g'"
          :node-data="item"
          layout-type="partition"
        >
          <circle
            :cx="item.y"
            :cy="item.x"
            r="10"
            stroke="#fff"
            stroke-width="2"
            fill="green"
          >
            <title>{{ item.data.name }} - {{ item.value }}</title>
          </circle>
        </D3HierarchyNode>

        <path v-if="myPath" :d="myPath._" stroke="#fff" stroke-width="3" />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3-hierarchy'
import * as shapes from 'd3-shape'
import { path } from 'd3-path'

import D3HierarchyNode from '@/components/d3/finished/D3HierarchyNode'

window.d3 = d3

export default {
  components: {
    D3HierarchyNode
  },
  data() {
    return {
      dataset:       null,
      size:          [500, 500],
      theme:         'Spectral',
      root:          null,
      myPath:        new path(),
      curveOptions:  Object.keys(shapes).filter(v => v.startsWith('curve')),
      selectedCurve: 'curveStep'
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
      //  path.path().quadraticCurveTo()
    },
    linkPaths() {
      if (this.links) {
        const leafPaths = this.root.leaves().map(v => v.ancestors())
        return leafPaths.map(v => {
          const l = shapes
            .line()
            .curve(shapes[this.selectedCurve])
            .x(vv => vv.y << 0)
            .y(vv => vv.x << 0)

          return l(v)
          // .linkHorizontal()
          // .source(v => [v.source.y, v.source.x])
          // .target(v => [v.target.y, v.target.x])(v)
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
      this.$http.get('/static/demo_data/hierarchy/edisco.json').then(res => {
        this.$nextTick(() => {
          const bounds = this.$el.querySelector('svg').getBoundingClientRect()
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
      if (item.data.leaf) {
        return 'green'
      } else {
        return 'green'
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

.edges {
  path {
    fill: none;
    // stroke: #fff;
    // stroke-width: 4;
  }
}
</style>
