export default class Section {
  constructor({ renderer }, selectorContainer) {
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  renderItems(cards) {
    cards.forEach((card) => {
      this.addItemAppend(this.renderer(card));
    });
  }
}
