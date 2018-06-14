<template>
  <div class="hello">
    <h1 v-html="msg"></h1>
    <h3>r
      <span class="fa fa-"></span>
    </h3>
    <div class="inputs">
      <input type="range"
             min="2"
             max="500"
             v-model.number="arcOptions.outerRadius">
      <input type="range"
             min="0"
             max="200"
             v-model.number="arcOptions.innerRadius">
      <input type="range"
             min="0"
             max="6.283185307179586"
             step=".001"
             v-model.number="arcOptions.startAngle">
      <input type="range"
             min="0"
             max="6.283185307179586"
             step=".001"
             v-model.number="arcOptions.endAngle">
      <input type="range"
             min="0"
             max="100"
             step=".001"
             v-model.number="arcOptions.cornerRadius">
    </div>
    <div class="test">
      <svg class="svg"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="-250 -250 500 500"
           xml:space="preserve"
           preserveAspectRatio="xMaxYMax meet">

        <defs>
          <linearGradient id="gradient">
            <stop offset="0%"
                  style="stop-color: deepPink"></stop>
            <stop offset="100%"
                  :style="testReactiveStyle"></stop>
          </linearGradient>
        </defs>

        <g>
          <d3-arc v-bind="arcOptions"
                  :path="p"
                  @mouseover="arcOptions.fill = colors[0]"
                  @mouseout="arcOptions.fill = colors[1]">

            <template slot-scope="{centroid}">
              <circle :cx="centroid[0] + 'px'"
                      :cy="centroid[1] + 'px'"
                      r="7"></circle>
              <text :x="centroid[0]"
                    :y="centroid[1]"
                    fill="black">testing</text>
            </template>
          </d3-arc>
        </g>

        <g>
          <d3-arc v-for="item in fruit"
                  :key="item.name"></d3-arc>
        </g>

      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import D3Arc from './d3/D3Arc'
import chroma from 'chroma-js'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your <span>Vue.js</span> App',
      colors: ['green', 'url(#gradient)'],
      p:
        'M13.868967095383844,-19.088995565695946A64.407,64.407,0,0,1,127.92439722315856,36.39160061183816A133,133,0,0,1,-35.70259295952093,128.11840170704116A64.407,64.407,0,0,1,23.520979209107004,1.8712394407864963L0,0Z',
      test: {
        a: 1,
        b: 2,
        c: this.test ? this.test.a + this.test.b : 0
      },
      arcOptions: {
        endAngle: 6.283185307179586,
        innerRadius: 0,
        outerRadius: 100,
        startAngle: 0,
        cornerRadius: 50,
        fill: chroma.rgb(255, 0, 255),
        stroke: chroma.rgb(255, 255, 255),
        'stroke-width': 0,
        color: 'green'
      },
      ti: null,
      pieData: null,
      fruit: [
        { name: 'Apples', quantity: 20 },
        { name: 'Bananas', quantity: 40 },
        { name: 'Cherries', quantity: 50 },
        { name: 'Damsons', quantity: 10 },
        { name: 'Elderberries', quantity: 30 }
      ]
    }
  },
  computed: {
    testReactiveStyle() {
      const r = 255 * (this.arcOptions.outerRadius / 500)
      const g = 255 * (this.arcOptions.innerRadius / 200)
      const b = 255 * (this.arcOptions.cornerRadius / 100)
      return {
        'stop-color': chroma.rgb(r, g, b).hex()
      }
    }
  },
  components: {
    D3Arc
  },
  mounted() {
    this.ti = setInterval(() => {
      const t = new Date().getSeconds()
      const r = Math.PI * 2 * (t / 60)
      this.arcOptions.startAngle = r
      // console.log('yep', t, r)
    }, 1000)

    this.pieData = d3.pie().value(d => d.quantity)
    this.pieData(this.fruit)
  },
  beforeDestroy() {
    clearInterval(this.ti)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.inputs {
  display: inline-flex;

  input {
    display: inline-block;
    margin: 0 20px;
  }
}
.hello {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.test {
  width: 500px;
  height: 500px;
  background: rgba(#fff, 0.2);
}
svg.svg {
  overflow: visible;
}
g {
  fill: url('http://bgrepeat.com/bg_128-191');
}
</style>
