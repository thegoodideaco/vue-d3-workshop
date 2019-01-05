<template>
  <g class="scale-ticks"
     :class="[position]">

    <!-- Tick instance -->
    <g v-for="(item, index) in ticks"
       :key="index"
       :transform="item.transform">

      <!-- Tick Line -->
      <line v-bind="item.lineTransform"
            stroke="#fff"
            stroke-width="2" />

      <!-- Text -->
      <text v-bind="item.textTransform">
        <slot v-bind="item">
          {{item.value}}
        </slot>
      </text>
    </g>
  </g>
</template>

<script>
/**
 * Creates a tick display
 * TODO: Need to make this work on all axis
 */
export default {
  props: {
    scale: {
      type:     Function,
      required: true
    },
    position: {
      type:    String,
      default: 'left',
      validator(val) {
        return ['left', 'top', 'right', 'bottom'].includes(val)
      }
    },
    count: {
      type: Number
    }
  },
  computed: {
    ticks() {
      return this.scale.ticks(this.count).map(v => {
        const s = this.scale(v)
        const p = this.position

        // Pixel values
        const x = p === 'left' || p === 'right' ? 0 : s
        const y = p === 'top' || p === 'bottom' ? 0 : s

        // translation
        const transform = `translate(${x} ${y})`

        const lineTransform = {
          x0: 0,
          y0: 0,
          x1: p === 'left' ? -5 : p === 'right' ? 5 : 0,
          y1: p === 'top' ? -5 : p === 'bottom' ? 5 : 0
        }

        const tx = p === 'left' ? -10 : p === 'right' ? 10 : 0
        const ty = p === 'top' ? -10 : p === 'bottom' ? 10 : 0

        const textTransform = {
          transform: `translate(${tx} ${ty})`
        }

        return {
          transform,
          lineTransform,
          textTransform,
          value: v
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.scale-ticks {
  // clip-path: inset(0 0 0 20px);
}

text {
  fill: #fff;
  // transform: translateY(-200px);
  font-size: 12px;
  text-anchor: middle;

  .top & {
  }

  .left & {
    dominant-baseline: central;
    text-anchor: end;
  }

  .right & {
    dominant-baseline: central;
    text-anchor: start;
  }

  .bottom & {
    text-anchor: middle;
    transform: translateY(20px);
  }
}
</style>
