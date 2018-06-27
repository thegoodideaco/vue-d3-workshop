<template>
  <div class="page-container">
    <article v-bar>

      <section ref="cloudContent">

        <div>
          <div class="section-content"
               v-pre>
            <div class="section-inner sectionLayout--insetColumn">
              <h1 id="vueandd3workshop">Vue and D3 Workshop</h1>

              <h2 id="introduction">Introduction</h2>

              <h3 id="hellomynameisjonsnyder">Hello! My name is Jon Snyder</h3>

              <p>I am the on the Front End UX Team over at
                <a href="http://www.onediscovery.com">One Discovery</a>. We create eDiscovery Software for law firms. The main focus is to provide insight into their data, as well as managing it.</p>

              <p>It can get complex. Each case is different, making data exploration an important aspect of this job.</p>

              <h2 id="datavisualization">Data Visualization</h2>

              <p>Data is
                <em>the</em> basic building block of analytical exploration. It tells a story, in an infinite amount of ways. But how do we read the story? How do we choose what chapters to focus on, and where to look for clues?</p>

              <p>In a neverending cycle of trying to interpret data, we need a way in which to
                <em>try</em> and see the data from different perspectives.</p>

              <h2 id="interfaces">Interfaces</h2>

              <blockquote>
                <p>"
                  <em>The greatest value of a picture is when it forces us to notice what we never expected to see.</em>"</p>

                <p>-John Tukey</p>
              </blockquote>

              <p>We have this amazing thing called vision. and out of all our senses, it's the most abundant in collecting data, giving us a better view of the world around us. However it opens doors for entirely new ways of understanding, which in return can open even more doors when combining parts of this spectrum.</p>

              <p>Having an interface that leverages these particular dimensions not only gives us insight from a viewing perspective, but also allows for navigation into the data that is being shown.</p>
            </div>
          </div>
        </div>
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
      seansRadius: v => (Math.random() > 0.5 ? 0 : 90 * Math.PI / 180)
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
