<template>
  <div>
    <small>Ill get back to this... {{ output }}</small>
    <ul>
      <li
        is="ScaleInput"
        v-for="item in scaleItems"
        :scale-item="item"
        :key="item.name"
      ></li>
    </ul>

    <!-- This will be testing d3 brush -->
    <svg>
      <g is="d3-brush" :scale="myScale" v-model="output" />

      <BrushInput
        :width="10"
        :height="height"
        :scale="myScale"
        :value="output"
        @input="output = $event"
      />
    </svg>
    <!-- This will be testing d3 brush -->
  </div>
</template>

<script>
// import all scales
import {
  scalePoint,
  scaleSequential,
  scaleQuantize,
  scaleQuantile,
  scaleTime,
  scaleThreshold,
  scaleOrdinal,
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
  name: 'D3ScaleDemos',
  data() {
    return {
      /** @type {ScaleIdentity} */
      scaleItems: Object.keys(scaleCollection).map(v => {
        return {
          scale:  scaleCollection[v],
          name:   v,
          domain: [0, 1],
          range:  [0, 1]
        }
      }),

      output: [386, 0],
      height: 300
    }
  },
  components: {
    ScaleInput: ScaleInputVue,
    BrushInput: D3BrushVue
  },
  watch: {
    myScale: {
      handler() {
        console.log('changed')
      },
      deep: true
    }
  },
  computed: {
    myScale() {
      return scaleLinear()
        .domain([0, 1000])
        .range([this.height, 0])
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
