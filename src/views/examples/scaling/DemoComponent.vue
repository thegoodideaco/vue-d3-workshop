<template>
  <div>
    <small>Ill get back to this... {{output}}</small>
    <ul>
      <li is="ScaleInput"
          v-for="item in scaleItems"
          :scale-item="item"
          :key="item.name">
      </li>
    </ul>

    <!-- This will be testing d3 brush -->
    <svg>
      <g is="d3-brush" :scale="myScale"
                v-model="output" />
    </svg>
    <!-- This will be testing d3 brush -->
  </div>
</template>

<script>
// import all scales
// ! getting coffee one sec
import {
  scalePoint,
  scaleSequential,
  scaleQuantize,
  scaleQuantile,
  scaleTime,
  scaleThreshold,
  scaleOrdinal,
  ScaleIdentity,
  scaleLinear
} from 'd3-scale'
import ScaleInputVue from '@/views/examples/scaling/ScaleInput.vue'
import D3BrushVue from '@/views/examples/scaling/D3Brush.vue'

const scaleCollection = {
  scalePoint,
  scaleSequential,
  scaleQuantize,
  scaleQuantile,
  scaleTime,
  scaleThreshold,
  scaleOrdinal
}

export default {
  name: 'D3-Scale-Demos',
  data() {
    return {
      /** @type {ScaleIdentity} */
      scaleItems: Object.keys(scaleCollection).map(v => {
        return {
          scale: scaleCollection[v],
          name: v,
          domain: [0, 1],
          range: [0, 1]
        }
      }),
      myScale: scaleLinear()
        .domain([0, 1000])
        .range([500, 0]),
      output: [0, 10]
    }
  },
  components: {
    ScaleInput: ScaleInputVue,
    D3Brush: D3BrushVue
  },
  watch: {
    myScale: {
      handler(val) {
        console.log('changed')
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  top: unset;
  left: unset;
}
</style>
