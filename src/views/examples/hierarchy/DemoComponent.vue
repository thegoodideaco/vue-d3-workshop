<template>
  <div
    class="fill"
    @click="layoutType = layoutType !== 'partition' ? 'partition' : 'treemap'"
  >
    <D3HierarchyLayout
      :dataset="dataset"
      :layout-size="size"
      class="reset-position"
      :layout-type="layoutType"
    >
      <template slot-scope="node">
        <rect
          v-if="layoutType === 'partition' || layoutType == 'treemap'"
          :width="node.x1 - node.x0"
          :height="node.y1 - node.y0"
          :x="node.x0"
          :y="node.y0"
          :class="{ leaf: !node.data.children }"
          :style="{ transitionDelay: `${node.depth * 90}ms` }"
        >
          <title>{{ node.data.name }}</title>
        </rect>

        <circle
          v-else-if="layoutType === 'pack'"
          :r="node.r"
          :cx="node.x"
          :cy="node.y"
          :class="{ leaf: !node.data.children }"
          :style="{ transitionDelay: `${node.depth * 90}ms` }"
        />
        <!-- <text>.
          <title>{{data.name}}</title>
        </text> -->
        <!-- <text :tx="x">{{data.name}} - {{x}}</text> -->
      </template>
    </D3HierarchyLayout>
  </div>
</template>

<script>
import * as d3 from 'd3-hierarchy'
import * as scale from 'd3-scale'
import * as collection from 'd3-array'
import chroma from 'chroma-js'

import D3HierarchyLayout from '@/components/d3/finished/D3HierarchyLayout'

export default {
  data() {
    return {
      dataset:    null,
      size:       [500, 500],
      theme:      'Spectral',
      tileStyles: [d3.treemapBinary, d3.treemapSquarify],
      layoutType: 'treemap'
    }
  },
  props: {
    tileStyle: {
      type:    Number,
      default: 0
    },
    paddingTop: {
      type:    Number,
      default: 45
    }
  },
  components: {
    D3HierarchyLayout
  },
  computed: {
    hierarchy() {
      if (this.dataset) {
        return d3
          .hierarchy(this.dataset)
          .sum(v => v.size || 0)
          .sort((a, b) => b.size - a.size || b.height - a.height)
      }
    },
    colorScale() {
      if (this.hierarchy) {
        const colors = chroma
          .scale(chroma.brewer.BuGn)
          .correctLightness(true)
          .colors(100, 'hex')
        return scale
          .scaleLinear()
          .domain(collection.ticks(0, this.hierarchy.value, colors.length))
          .nice(100)
          .range(colors)
      }
    },
    treeMapGenerator() {
      return d3
        .treemap()
        .size(this.size)
        .round(true)
        .padding(5)
        .paddingTop(this.paddingTop)
        .tile(this.curStyle || this.tileStyles[0])
      // .paddingOuter(3)
      // .paddingInner(5)
    },
    curStyle() {
      return this.tileStyles[this.tileStyle || 0]
    },
    treemap() {
      if (this.treeMapGenerator && this.hierarchy)
        return this.treeMapGenerator(this.hierarchy)
    },
    leaves() {
      if (this.treemap) return this.treemap.leaves()
    },
    descendants() {
      if (this.treemap) return this.treemap.descendants()
    }
  },
  methods: {
    generateNodeStyle(leaf) {
      const x = leaf.x0
      const y = leaf.y0
      const width = leaf.x1 - leaf.x0
      const height = leaf.y1 - leaf.y0
      const c = this.colorScale(leaf.value)

      // const transDelay = this.treemap.
      const options = {
        left:            0,
        transform:       `translate3d(${x}px, ${y}px, 0)`,
        width:           `${width}px`,
        height:          `${height}px`,
        backgroundColor: c,
        color:           '#000'
      }

      options.transitionDelay = `${(this.dataset.height / leaf.height) * 100}ms`

      if (Math.sqrt(width * width + height * height) < 400) {
        options.fontSize = '10px'
      }

      return options
    },
    getAncestors(leaf) {
      return leaf.ancestors()
    },
    translation(x0 = 0, y0 = 0) {
      const str = `translate(${x0}px ${y0}px)`
      console.log(str)
      return str
    }
  },
  mounted() {
    this.$http.get('/static/demo_data/hierarchy/edisco.json').then(res => {
      this.$nextTick(() => {
        const bounds = this.$el.getBoundingClientRect()
        this.size = [bounds.width, bounds.height]
        this.dataset = {
          name:     'root',
          children: res.data
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  background-color: rgba(#fff, 0.5);
  top: 0;
  left: 0;
  padding: 0;
  transition: all 500ms ease;
  overflow: hidden;
}

svg rect,
svg circle {
  transition: all 800ms ease;
  fill: desaturate(blue, 50);

  &.leaf {
    fill: #fff;
  }
}

.fill {
  height: 100%;
  position: relative;
}

svg.reset-position {
  top: auto;
  left: auto;
}

small {
  color: #fff;
}
</style>
