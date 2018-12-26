<template>
  <div>
    <button @click="getData()">Click me</button>
    <ul>
      <li v-for="(item, index) in sites" :key="index">{{ item.url }}</li>
    </ul>
    <slot>This is default content</slot>
    <ul>
      <li v-for="a in admins" :key="a">{{ a }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sites: null
    }
  },
  methods: {
    getData() {
      this.$http.get('/static/demo_data/testdata.json').then(res => {
        this.sites = res.data
      })
    }
  },
  computed: {
    admins() {
      if (this.sites) {
        return this.sites.map(v => v._id)
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style></style>
