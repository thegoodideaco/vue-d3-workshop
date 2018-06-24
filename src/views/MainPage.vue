<template>
  <div class="page-container">
    <article>

      <section ref="cloudContent">

        <div class="section-content"
             v-pre>
          <div class="section-inner sectionLayout--insetColumn">
            <h1>Sean Sean Sean Jaa Jirapinya Snyder Jaa Jaa Jaa</h1>
            <p name="7aa1"
               id="7aa1"
               class="graf graf--p graf--leading">If you’ve ever gotten frustrated trying to figure out why your code doesn’t work, or how someone else’s code works, you are not alone. This is for you.</p>
            <p name="3102"
               id="3102"
               class="graf graf--p graf-after--p">For the last eight years or so, I have been building tools for visualizing information. The most successful outcome of this effort has been
              <a href="https://d3js.org"
                 data-href="https://d3js.org"
                 class="markup--anchor markup--p-anchor"
                 rel="nofollow noopener"
                 target="_blank">D3</a>, a JavaScript library. Yet a danger of spending so long designing a tool is that you may forget
              <em class="markup--em markup--p-em">what the tool is for</em>: the tool itself becomes the goal, rather than the value derived from its application.</p>
            <p name="cb07"
               id="b5da"
               class="graf graf--p graf-after--figure">To give a comically dense example, here is a Bash command I wrote recently to generate a
              <a href="https://bl.ocks.org/mbostock/5562380"
                 data-href="https://bl.ocks.org/mbostock/5562380"
                 class="markup--anchor markup--p-anchor"
                 rel="nofollow noopener"
                 target="_blank">choropleth of population density</a> of California. Actually, this just generates the simplified geometry; a few more commands are needed to produce the SVG.</p>
          </div>
        </div>

        <h2>What is
          <span>Vue.js?</span>
        </h2>
        <ul>
          <li>Data Visuals!</li>
        </ul>
        <h3>Design creates stories, and stories create memorable experiences, and great experiences have this innate ability to change the way in which we view our world.</h3>
      </section>

    </article>
    <div class="example-content"
         ref="sectionContent">
      <word-cloud :value="cloudText"
                  :size="svgSize"
                  :rotate="seansRadius"
                  :immediate="true" />
    </div>
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'
import WordCloud from '@/components/d3/finished/WordCloud'
export default {
  data() {
    return {
      cloudText: null,
      sections: [
        {
          title: 'What is Vue.js??'
        }
      ],
      svgSize: [1000, 1000],
      rotations: [0, 360],
      seansRadius: () => {
        return Math.random() > 0.5 ? 0 : Math.PI * 0.5
      }
    }
  },
  components: {
    WordCloud,
    MarkDown
  },
  computed: {
    /**
     * This will return a table of unique words, and the amount of times they are used
     */
    // dataset() {
    //   if (this.$data._words) {
    //     return Object.entries(
    //       this.$data._words.reduce((stats, word) => {
    //         if (stats.hasOwnProperty(word)) {
    //           stats[word] += 1
    //         } else {
    //           stats[word] = 1
    //         }
    //         return stats
    //       }, {})
    //     ).map(v => {
    //       return {
    //         text: v[0],
    //         size: v[1]
    //       }
    //     })
    //   }
    // },
    // cloudLayout() {
    //   return cloud().size(this.layoutOptions.size)
    // },
    // layoutWords() {
    //   return this.cloudLayout.words(this.dataset)
    // }
  },
  mounted() {
    this.$nextTick(() => {
      const rect = this.$refs.sectionContent.getBoundingClientRect()
      this.svgSize = [rect.width, rect.height]
      //   this.$data._words = _.words(this.$el.innerText)
      console.log(this.$el.innerText)
      this.cloudText = this.$refs.cloudContent.innerText
    })
  }
}
</script>

<style>
</style>
