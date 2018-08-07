<template>
  <div>
    <h2>Brewer Colors</h2>
    <p>Brewer colors are used specifically for charts and maps. They are designed to work well with quantitative visuals, such as population density.</p>
    <div>
      <div class="brewer-container"
           v-for="(item, index) in brewerColors"
           :key="index">

        <h3>{{index}}</h3>

        <div class="color-block--container">
          <span class="brewer-color--item"
                v-for="(color, index) in item"
                :key="index"
                :style="getStyle(color)" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import chroma from 'chroma-js'
import { mapValues, reduce } from 'lodash'

// !We must reduce to exclude duplicated lowercase keys
const brewerColors = reduce(
  mapValues(chroma.brewer),
  (prev, curr, k, obj) => {
    console.log(prev, curr, k, obj)
    if (k.match(/([A-Z])/g) !== null) {
      prev[k] = curr
    }
    return prev
  },
  {}
)
// Remove extra props

export default {
  data() {
    return {
      brewerColors
    }
  },
  methods: {
    getStyle(item) {
      return {
        backgroundColor: item
      }
    }
  }
}
</script>

<style scoped lang="scss">
.brewer-container {
  display: inline-flex;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.22);
  margin: 4px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgb(240, 248, 255);

  h3 {
    flex: 0 1 auto;
    margin-right: 10px;
  }
}

.color-block--container {
  flex: 1 1 auto;
}

.brewer-color--item {
  $size: 20px;

  width: $size;
  height: $size;
  display: inline-block;
}
</style>
