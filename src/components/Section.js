export default class Section {
  constructor({items, renderer}, selectorContainer) {
    this._items = items
    this.renderer = renderer
    this._container = document.querySelector(selectorContainer)
  }

  addItem(element) {
    this._container.prepend(element)
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(this.renderer(item))
    })
  }
}
