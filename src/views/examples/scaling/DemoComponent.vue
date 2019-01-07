<template>
  <div>

    <!-- Continous Scales -->
    <div>
      <h2>Continuous</h2>
      <div>
        <!-- ScaleLinear -->
        <scale-display :scale-class="scales.scaleLinear"
                       :domain="[1, 2, 25, 10, 95]" />
      </div>
    </div>

    <!-- Sequential -->
    <div>
      <h2>Sequential</h2>
      <div>
        <div>
          Scale
        </div>
      </div>
    </div>

    <!-- Diverging -->
    <div>
      <h2>Diverging</h2>
      <div>
        <div>
          Scale
        </div>
      </div>
    </div>

    <div>
      <h2>Quantize</h2>
      <div>
        <div>
          Scale
        </div>
      </div>
    </div>

    <div>
      <h2>Quantile</h2>
      <div>
        <div>
          Scale
        </div>
      </div>
    </div>

    <div>
      <h2>Threshold</h2>
      <div>
        <div>
          Scale
        </div>
      </div>
    </div>

    <div>
      <h2>Ordinal</h2>
      <div>
        <div>
          Scale
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import all scales
// * happy new years! 🍾

import ScaleDisplay from './ScaleDisplay.vue'
import {
  scaleLinear,
  scaleTime,
  scaleLog,
  scaleIdentity,
  scalePow,
  scaleSequential,
  scaleDiverging,
  scaleQuantize,
  scaleQuantile,
  scaleThreshold,
  scaleBand,
  scalePoint,
  scaleOrdinal
} from 'd3-scale'
export default {
  name: 'D3ScaleDemos',
  data() {
    return {
      scales: {
        scaleLinear,
        scaleTime,
        scaleLog,
        scaleIdentity,
        scalePow,
        scaleSequential,
        scaleDiverging,
        scaleQuantize,
        scaleQuantile,
        scaleThreshold,
        scaleBand,
        scalePoint,
        scaleOrdinal
      }
    }
  },
  provide: {
    dataset: [1, 4, 50, 100, 900]
  },
  components: {
    ScaleDisplay
  }
}
</script>
