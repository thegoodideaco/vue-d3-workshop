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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porttitor, massa at porta sodales, tortor mi tincidunt lectus, vitae egestas libero ipsum at dui. Nunc quis lorem urna. Mauris et neque eu purus accumsan vestibulum. Curabitur hendrerit lorem laoreet vulputate tempor. Curabitur lobortis felis massa, quis suscipit nisi auctor eu. Mauris vitae ligula ut dui malesuada vehicula at sed elit. Sed accumsan pharetra lacinia. Maecenas imperdiet nibh in lacus cursus finibus.</p>
      </section>
    </article>

    <div class="example-content">
      <div class="well">
        <svg class="svg"
             x="0px"
             y="0px"
             _width="100%"
             _height="100%"
             _viewBox="0 0 auto auto"
             _style="enable-background:new 0 0 100 100;"
             xml:space="preserve"
             preserveAspectRatio="xMaxYMax meet">

          <text v-for="(item, index) in words"
                :key="index"
                :x="item.x"
                :y="item.y"
                :rotate="item.rotate">{{item.text}}</text>

        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import cloud from 'd3-cloud'
import _ from 'lodash'

export default {
  data() {
    return {
      words: [],
      arcSettings: {
        cornerRadius: 10,
        endAngle: 350,
        innerRadius: 20,
        outerRadius: 300,
        path: undefined,
        startAngle: 0,
        c: cloud()
      },
      sliceStyle: {
        stroke: 'rgb(127, 255, 212)',
        strokeWidth: '3px',
        fill: 'rgb(55, 175, 122)'
      }
    }
  },
  components: {},
  methods: {
    getStyle(item) {
      return {
        transform: '`translate([${item.x}, ${item.y}]) rotate(${item.rotate})`'
      }
    }
  },
  created() {
    this.$nextTick(() => {
      const _words = _.words(this.$el.innerText).map(w => {
        return {
          text: w,
          size: 10 + Math.random() * 90,
          test: 'haha'
        }
      })

      console.log(_words)

      const t = cloud()
        .size([500, 500])
        .words(_words)
        .on('end', a => (this.words = a))

      this.words = []
      t.start()
    })
  }
}
</script>

<style lang="scss">
.main-container__inner {
  position: relative;
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
  flex: 1 0 auto;
  min-height: 0;
}


</style>
