export default class Section {
  constructor({ renderer }, selectorContainer) {
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    cards.forEach((card) => {
      this.addItem(this.renderer(card));
    });
  }
}
