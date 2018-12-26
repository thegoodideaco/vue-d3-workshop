<template>
  <div ref="svg"
       class="fill">
    <RecursiveTree v-if="root"
                   :tree-node="root">did it work</RecursiveTree>

    <svg>
      <ThreadArc v-for="(item, index) in descendants"
                 :key="index"
                 :tree-node="item"
                 :root-node="root">
        <title slot="circle">{{ item.data.name }} {{ item.value }}</title>

        <text>
          {{ item.data.name }} - {{ item.depth ? item.depth : 0 }} -
          {{ item.value }}
        </text>
      </ThreadArc>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3-hierarchy'
import ThreadArc from './ThreadArc'
import RecursiveTree from './RecursiveTree'

// window.d3 = d3

export default {
  components: {
    ThreadArc,
    RecursiveTree
  },
  data() {
    return {
      dataset: null,
      size:    [500, 500],
      root:    null
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
          // debugger
          this.root = d3
            .hierarchy(this.dataset)
            // .sum(d => d.children && d.children.length ? d.children.length : 0)
            .sum(d => d.size)
            .count()
            .sort((a, b) => {
              return b.height - a.height || b.value - a.value
            })
            .each(n => {
              Object.assign(n, {
                y: n.parent ? n.parent.y + 50 : 0
              })
            })
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

.thread-arc {
  fill: #fff;
}
</style>
