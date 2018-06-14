<template>
    <div class="main-container__inner">
        <article>
            <section id="who">
                <h2>What is
                    <span>Vue.js?</span>
                </h2>
                <ul>
                    <li>This is a paragraph</li>
                    <li>This is a paragraph</li>
                    <li>This is a paragraph</li>
                    <li>This is a paragraph!</li>
                </ul>
            </section>
        </article>

        <div class="example-content">
            <div class="well">
                <svg class="svg"
                     width="100%"
                     height="100%"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="-250 -250 500 500"
                     xml:space="preserve"
                     preserveAspectRatio="xMaxYMax meet">

                    <d3-arc v-bind="arcSettings"></d3-arc>

                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import D3Arc from '@/components/d3/D3Arc'
export default {
  data() {
    return {
      arcSettings: {
        cornerRadius: 10,
        endAngle: 6.283185307179586,
        innerRadius: 0,
        outerRadius: 100,
        path: undefined,
        startAngle: 0
      }
    }
  },
  components: {
    D3Arc
  }
}
</script>

<style lang="scss">
.main-container__inner {
    position: relative;
  display: flex;
  flex: 1 0 auto;
  min-height: 0;
}

.example-content {
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  flex: 1 1 auto;
  margin-left: auto;
}
</style>
