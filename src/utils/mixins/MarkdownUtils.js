export default {
  beforeMount() {
    const div = document.createElement('div')
    div.innerHTML = this.readme
    const links = div.querySelectorAll('a')
    links.forEach(element => {
      element.target = '_blank'
    })

    this.readme = div.innerHTML
  }

}
