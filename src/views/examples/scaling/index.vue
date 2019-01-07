<template>
  <div>
    <demo-component />
  </div>
</template>

<script>
export default {
  components: {
    DemoComponent: () => import('./DemoComponent')
    // BasePage
  }
}
</script>
