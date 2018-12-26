<template>
  <div class="fill">
    <svg ref="svg">
      <g class="edges">
        <line
          v-for="(item, index) in links"
          :key="index"
          :x1="item.source.y"
          :y1="item.source.x"
          :x2="item.target.y"
          :y2="item.target.x"
          stroke="#000"
          :stroke-width="item.target.height + 2"
        ></line>
      </g>
      <g class="nodes">
        <g v-for="(item, index) in descendants" :key="index">
          <circle
            :cx="item.y"
            :cy="item.x"
            r="10"
            stroke="#000"
            stroke-width="4"
            :fill="depthFill(item)"
          >
            <title>{{ item.data.name }} - {{ item.depth }}</title>
          </circle>

          <!-- <foreignObject
                         fill="#fff"
                         :x="!item.children ? item.y - 50 : item.y"
                         :y="item.x - 40">
            <div class="text-overlay">

              <span>{{item.data.name}}</span>
            </div>
          </foreignObject> -->
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3-hierarchy'
import * as scale from 'd3-scale'
import chroma from 'chroma-js'

export default {
  data() {
    return {
      dataset: null,
      size:    [500, 500],
      theme:   'Spectral',
      root:    null
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
    },
    depthColorScale() {
      return scale
        .scaleOrdinal()
        .domain([0, 1, 2, 5, 6])
        .range(chroma.scale(chroma.brewer.Set3).colors(5))
    }
  },
  beforeMount() {
    if (this.vData) {
      this.$nextTick(() => {
        const bounds = this.$refs.svg.getBoundingClientRect()
        this.size = [bounds.width, bounds.height].reverse()
        this.dataset = this.vData
      })
    } else {
      this.$http.get('/static/demo_data/hierarchy/edisco.json').then(res => {
        this.$nextTick(() => {
          const bounds = this.$refs.svg.getBoundingClientRect()
          this.size = [bounds.width, bounds.height].reverse()
          this.dataset = res.data[0]
        })
      })
    }
  },
  methods: {
    depthFill(node) {
      return this.depthColorScale(node.depth)
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
.fill {
  width: 100%;
  height: 100%;
  padding: 25px;
  position: relative;
}
svg {
  transform: translateY(-50%) translateX(-50%);
  padding: 5px;
  width: 480px;
  height: 210px;
}
.text-overlay {
  white-space: nowrap;
  background-color: rgb(100, 149, 237);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 11px;
  border: 2px solid rgb(255, 255, 255);
  text-rendering: optimizeLegibility;
  text-shadow: 0 2px 4px #000;
  font-weight: bold;
  display: inline-block;
  transform: translate(-50%, -50%);
}
.nodes {
  text {
    font-size: 14px;
    stroke: rgba(141, 211, 199, 0.1);
    font-weight: bold;
    text-rendering: optimizeLegibility;
    stroke-width: 2;
    stroke-linecap: butt;
    text-shadow: 1px 0px 1px black;
  }
}

.edges {
  path {
    fill: none;
    stroke: #fff;
    stroke-width: 4;
  }
}
</style>
