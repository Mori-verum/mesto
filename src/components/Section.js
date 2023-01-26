export default class Section {
  constructor({ items, renderer }, postContainer) {
    // this._items = items;
    this._renderer = renderer;
    this._container = postContainer;
  }

  renderItems(items) {
    this._container.textContent = '';
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}

