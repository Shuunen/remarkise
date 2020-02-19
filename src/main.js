/* global FileReader, remark */

class Remarkise {
  constructor () {
    console.log('remarkise init')
    this.setElements()
    this.handleDrop()
    this.handleUpload()
    this.handleFullscreen()
  }

  setElements () {
    this.remarkiseEl = document.querySelector('#remarkise')
    this.uploadInputEl = document.querySelector('#remarkise-upload')
    this.dropAreaEl = document.querySelector('#remarkise-drop-area')
    this.fullscreenEl = document.querySelector('#remarkise-fullscreen')
  }

  handleFullscreen () {
    this.fullscreenEl.addEventListener('click', this.toggleFullscreen)
  }

  goFullscreen () {
    document.documentElement.requestFullscreen()
  }

  toggleFullscreen () {
    if (document.fullscreenElement) return document.exitFullscreen()
    this.goFullscreen()
  }

  handleUpload () {
    this.dropAreaEl.addEventListener('click', () => this.uploadInputEl.click())
    this.uploadInputEl.addEventListener('change', () => this.readLocalFile(this.uploadInputEl.files[0]))
  }

  handleDrop () {
    window.addEventListener('dragover', event => this.onDrag(event))
    window.addEventListener('drop', event => this.onDrop(event))
  }

  onDrag (event) {
    event.preventDefault()
    this.dropAreaEl.classList.add('bg-orange-100')
  }

  onDrop (event) {
    event.preventDefault()
    this.readLocalFile(event.dataTransfer.files[0])
  }

  createPresentationFromMd (md) {
    this.remarkiseEl.classList.add('hidden')
    this.goFullscreen()
    remark.create({ source: md })
  }

  readLocalFile (file) {
    var reader = new FileReader()
    reader.onloadend = () => this.createPresentationFromMd(reader.result)
    reader.readAsText(file)
  }
}

window.remarkise = new Remarkise()
