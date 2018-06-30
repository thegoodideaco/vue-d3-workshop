<template>
  <svg>
    <circle v-for="(item, index) in dataset"
            :key="index"
            :cx="item[0]"
            :cy="item[1]"
            r="10"
            fill="#fff"
            @click="onClick(item)" />
  </svg>
</template>

<script>
import dataset from './dataset'
export default {
  data() {
    return {
      dataset
    }
  },
  methods: {
    onClick(item) {
      console.log('hey there', item)
    }
  }
}
</script>