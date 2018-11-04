<template>
  <div class="fill">
    <div class="box"
         v-for="(item, index) in descendants"
         :key="index"
         :style="generateNodeStyle(item)">

      <slot v-bind="{item, size: hierarchy.value}">
        <small>{{item.data.name}}</small>
        <small>{{item.data.size}}</small>
      </slot>

    </div>
  </div>
</template>

<script>
import * as d3 from 'd3-hierarchy'
import * as scale from 'd3-scale'
import * as collection from 'd3-array'
import chroma from 'chroma-js'

export default {
  name: 'Tree-Map',
  data() {
    return {
      dataset: null,
      size: [500, 500],
      theme: 'Spectral',
      t: null,
      tileStyles: [d3.treemapBinary, d3.treemapSquarify],
      asCircle: false
    }
  },
  props: {
    tileStyle: {
      type: Number,
      default: 0
    },
    paddingTop: {
      type: Number,
      default: 45
    }
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
    circlePack() {
      return d3
        .pack()
        .size(this.size)
        .padding(5)
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
    packer() {
      if (this.circlePack && this.hierarchy) {
        return this.circlePack(this.hierarchy)
      }
    },
    leaves() {
      if (this.treemap) return this.treemap.leaves()
    },
    descendants() {
      if (this.treemap) return this.treemap.descendants()
    }
  },
  methods: {
    generateNodeStyle(leaf, parent = null) {
      let x = leaf.x0
      let y = leaf.y0
      let width = leaf.x1 - leaf.x0
      let height = leaf.y1 - leaf.y0

      if (this.asCircle) {
        x = leaf.x - leaf.r
        y = leaf.y - leaf.r
        width = height = leaf.r * 2
      }

      const c = this.colorScale(leaf.value)
      const b = chroma(c).luminance()

      // const transDelay = this.treemap.
      let options = {
        left: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: c,
        color: '#000',
        borderRadius: this.asCircle ? '50%' : '0'
      }

      options.transitionDelay = `${this.dataset.height / leaf.height * 100}ms`

      if (Math.sqrt(width * width + height * height) < 400) {
        options.fontSize = '10px'
      }

      return options
    },
    getAncestors(leaf) {
      return leaf.ancestors()
    }
  },
  beforeMount() {
    this.$http.get('/static/demo_data/hierarchy/flare.json').then(res => {
      this.$nextTick(() => {
        const bounds = this.$el.getBoundingClientRect()
        this.size = [bounds.width, bounds.height]
        this.dataset = res.data
      })
    })
  },
  watch: {
    asCircle(val) {
      if (val) this.circlePack(this.hierarchy)
    }
  }
}
</script>

<style lang="scss">
.box {
  position: absolute;
  background-color: rgba(#fff, 0.5);
  top: 0;
  left: 0;
  padding: 0;
  transition: transform 800ms ease, width 800ms ease, height 300ms ease,
    border-radius 300ms ease;
  overflow: hidden;
}

.fill {
  height: 100%;
  position: relative;
}
</style>