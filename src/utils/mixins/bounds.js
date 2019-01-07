export default {
  data() {
    return {
      dimensions: {
        width:  0,
        height: 0
        // viewBox: '0 0 700 700'
      }
    }
  },
  methods: {
    updateDimensions() {
      // _.debounce(() => {
      this.$nextTick(() => {
        const bounds = (this.$refs.svg || this.$el).getBoundingClientRect()
        this.dimensions.width = bounds.width
        this.dimensions.height = bounds.height
      })
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateDimensions)
    this.updateDimensions()

  },
  activated() {
    window.addEventListener('resize', this.updateDimensions)
  },
  deactivated() {
    window.removeEventListener('resize', this.updateDimensions)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDimensions)
  }
}