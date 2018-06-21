<template>
    <div class="page-container">
        <article>
            <section ref="cloudContent">
                <h2>What is
                    <span>Vue.js?</span>
                </h2>
                <ul>
                    <li>Data Visuals!</li>
                </ul>
                <h3>Design creates stories, and stories create memorable experiences, and great experiences have this innate ability to change the way in which we view our world.</h3>
            </section>

        </article>
        <div class="example-content">
            <word-cloud :value="cloudText" />
        </div>
    </div>
</template>

<script>
import WordCloud from '@/components/d3/finished/WordCloud'
export default {
  data() {
    return {
      cloudText: null,
      sections: [
        {
          title: 'What is Vue.js??'
        }
      ]
    }
  },
  components: {
    WordCloud
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
      console.log(this.$el.innerText)
      this.cloudText = this.$refs.cloudContent.innerText
      //   this.$data._words = _.words(this.$el.innerText)
    })
  }
}
</script>

<style>
</style>
