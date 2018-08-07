<template>
  <g class="hierarchy-node"
     :style="styles">
    <slot v-bind="$props">
      <!-- <circle r="10"
              fill="#fff">

      </circle> -->
    </slot>
  </g>
</template>

<script>
export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    layoutType: {
      type: String,
      default: 'treemap',
      validator: v => {
        return v === 'treemap' || v === 'partition'
      }
    },
    autoPosition: {
      type: Object
    }
  },
  computed: {
    links() {
      if(this.nodeData){
        return this.nodeData.links()
      }
    },
    styles() {
      if (!this.autoPosition) return
      const x =
        this.layoutType === 'treemap' || this.layoutType === 'partition'
          ? this.nodeData.x0
          : this.nodeData.x
      const y =
        this.layoutType === 'treemap' || this.layoutType === 'partition'
          ? this.nodeData.y0
          : this.nodeData.y

      let props = {
        transform: `translate3d(${x}px,${y}px,0)`
      }

      // If this is a treemap or partition assign width and height
      if (this.layoutType === 'treemap' || this.layoutType === 'partition') {
        Object.assign(props, {
          width: `${this.nodeData.x1 - this.nodeData.x0}px`,
          height: `${this.nodeData.y1 - this.nodeData.y0}px`
        })
      }

      if (this.layoutType === 'pack') {
        Object.assign(props, {
          width: `${this.nodeData.r * 2}px`,
          height: `${this.nodeData.r * 2}px`
        })
      }

      return props
    }
  }
}
</script>

<style scoped lang="scss">
.hierarchy-node {
  position: absolute;
}
</style>
