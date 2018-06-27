<template>
  <svg class="svg"
       x="0px"
       y="0px"
       width="100%"
       height="100%"
       _viewBox="0 0 auto auto"
       _style="enable-background:new 0 0 100 100;"
       xml:space="preserve"
       preserveAspectRatio="xMaxYMax meet">

    <g v-for="(item, index) in dataset"
       :key="index"
       :style="item.groupStyle">
      <text :width="item.width"
            :height="item.height"
            :style="item.style"
            _x="item.x"
            _y="item.y"
            _angle="n.rotate"
            _transform="`rotate(${item.rotate})`">
        {{item.text}}
      </text>
    </g>
  </svg>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'
import chroma from 'chroma-js'
import cloud from 'd3-cloud'

const co = chroma.scale(chroma.brewer.Greens)

/**
 * https://github.com/jasondavies/d3-cloud
 */
export default {
  data() {
    return {
      dataset: [],
      ch: chroma,
      scaleRange: [10, 120],
      scaleDomain: [1, 100],
      color: d3
        .scaleLinear()
        .domain([0, 9])
        .range(co.colors(3)),
      onEnd: v => {
        this.dataset = v
          .map(n => {
            return {
              ...n,
              style: {
                fill: this.color(n.value),
                // transform: `translate3d(${n.x}px, ${n.y}px, 0) rotateZ(${
                //   n.rotate
                // }rad)`,
                // rotate: n.rotate + 'deg',
                fontSize: `${n.size * 1.5}px`,
                textAlign: 'center'
              },
              groupStyle: {
                transform: `translate3d(${n.x}px, ${n.y}px, 0) rotateZ(${
                  n.rotate
                }rad)`
              }
            }
          })
          .sort((a, b) => {
            return a.value - b.value
          })
      }
    }
  },
  props: {
    value: {
      type: String,
      default:
        'Design creates stories, and stories create memorable experiences, and great experiences change the way in which we view our world.'
    },
    size: {
      type: Array,
      default() {
        return [800, 800]
      }
    },
    rotate: {
      type: [Number, Function],
      default() {
        // return 0
        return v => (Math.random() > 0.5 ? 0 : 90 * Math.PI / 180)
      }
    },
    padding: {
      type: Number,
      default: 20
    },
    immediate: {
      type: Boolean
    }
  },
  watch: {
    /**
     * This watches for any changes, which then generates the dataset
     * The dataset is not computed because the words layout will write to it directly.
     */
    value: {
      handler(val) {
        this.$nextTick(() => {
          //   stop previous generation
          if (this.cloudLayout) {
            this.cloudLayout.stop()
          }

          console.log(this.$el.clientHeight)

          // Get the unique words, and their frequency
          this.dataset = Object.entries(
            _.words(val).reduce((stats, word) => {
              if (stats.hasOwnProperty(word)) {
                stats[word] += 1
              } else {
                stats[word] = 1
              }
              return stats
            }, [])
          )
            // convert it to a dataset that the cloud will write to
            .map(v => {
              return {
                text: v[0],
                value: v[1]
              }
            })
            // Sort it by frequency
            .sort((a, b) => {
              return b.value - a.value
            })

          if (this.cloudLayout) {
            this.cloudLayout.start()
          }
        })
      },
      immediate: this.immediate ? true : false
    }
  },
  computed: {
    cloudLayout() {
      return cloud()
        .size(this.size)
        .words(this.dataset)
        .rotate(this.rotate)
        .padding(this.padding)
        .spiral('rectangular')
        .fontSize(w => _.clamp(w.value * 5, 10, 50))
        .font('Lato')
        .on('end', this.onEnd)
    },
    ls() {
      return d3
        .scaleLinear()
        .range(this.scaleRange)
        .domain(this.scaleDomain)
    }
  }
}
</script>

<style scoped lang="scss">
text {
  transition: all 800ms ease;
  user-select: none;
  text-shadow: 1px 1px 4px rgba(#000, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    fill: #fff;
  }
}
</style>
