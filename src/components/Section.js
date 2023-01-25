export default class Section {
  constructor({ items, renderer }, postContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = postContainer;
  }

  renderItems() {
    this._container.textContent = '';
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}

