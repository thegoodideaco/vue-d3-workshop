<template>
  <div class="fill">
    <input v-model.number="forceStrength">
    <svg>
      <circle v-for="(node, index) in nodes"
              :key="index"
              :cx="node.x"
              :cy="node.y"
              :fill="fillColor(node.group)"
              :r="node.radius"
              @click="showYears = !showYears"></circle>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
var t = 0
// Nice looking colors - no reason to buck the trend
// @v4 scales now have a flattened naming scheme
var fillColor = d3
  .scaleOrdinal()
  .domain(['low', 'medium', 'high'])
  .range(['#d84b2a', '#beccae', '#7aa25c'])

export default {
  data() {
    return {
      fillColor,
      center: { x: 0, y: 0 },
      forceStrength: 0.03,
      rawData: null,
      simulation: null,
      yearCenters: {
        2008: {
          x: -200,
          y: 0
        },
        2009: {
          x: 0,
          y: 0
        },
        2010: {
          x: 200,
          y: 0
        },
        low: {
          x: -500,
          y: 333
        },
        medium: {
          x: 0,
          y: 0
        },
        high: {
          x: 300,
          y: -500
        }
      },
      showYears: false,
      orgNames: []
    }
  },
  computed: {
    nodes() {
      if (!this.rawData) return
      // Use the max total_amount in the data as the max in the scale's domain
      // note we have to ensure the total_amount is a number.
      var maxAmount = d3.max(this.rawData, function(d) {
        return +d.total_amount
      })

      // Sizes bubbles based on area.
      // @v4: new flattened scale names.
      var radiusScale = d3
        .scalePow()
        .exponent(0.6)
        .range([2, 85])
        .domain([0, maxAmount])

      // Use map() to convert raw data into node data.
      // Checkout http://learnjsdata.com/ for more on
      // working with data.
      this.orgNames = []
      var myNodes = this.rawData.map(d => {
        if (!this.orgNames.includes(d.group)) {
          this.orgNames.push(d.group)
        }
        return {
          id: d.id,
          radius: radiusScale(+d.total_amount),
          value: +d.total_amount,
          name: d.grant_title,
          org: d.organization,
          group: d.group,
          year: d.start_year,
          x: Math.random() * 900,
          y: Math.random() * 800
        }
      })

      // sort them to prevent occlusion of smaller nodes.
      myNodes.sort(function(a, b) {
        return b.value - a.value
      })

      return myNodes
    }
  },
  methods: {
    charge(d) {
      return -this.forceStrength * Math.pow(d.radius, 2.0)
    },
    ticked() {
      t++
      this.$forceUpdate()
      // this.nodes = this.nodes
    }
  },
  mounted() {
    d3.csv('/static/demo_data/gates.csv').then(res => {
      this.rawData = res
    })
  },
  watch: {
    nodes(val) {
      this.simulation = d3
        .forceSimulation(this.nodes)
        .velocityDecay(0.3)
        .force(
          'x',
          d3
            .forceX()
            .strength(this.forceStrength)
            .x(this.center.x)
        )
        .force(
          'y',
          d3
            .forceY()
            .strength(this.forceStrength)
            .y(this.center.y)
        )
        .force('charge', d3.forceManyBody().strength(this.charge))
        .on('tick', this.ticked)
    },
    showYears(val) {
      console.log('change it wtf')
      const r = Math.random() > 0.5
      if (this.simulation) {
        this.simulation.force(
          'x',
          d3
            .forceX()
            .strength(this.forceStrength)
            .x(d => {
              return val
                ? this.yearCenters[r ? d.group : d.year].x
                : this.center.x
            })
        )

        this.simulation.force(
          'y',
          d3
            .forceY()
            .strength(this.forceStrength)
            .y(d => {
              return val
                ? this.yearCenters[r ? d.group : d.year].y
                : this.center.y
            })
        )

        this.simulation.alpha(1).restart()
      }
    }
  }
}
</script>

<style scoped>
.fill {
  height: 100%;
}
</style>
