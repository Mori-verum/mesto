export default class Section {
  constructor({ items, renderer }, selector, api) {
    this._items = items;
    this._renderer = renderer;
    this._container = selector;
    this._api = api;
  }

  renderItems() {
    this._container.textContent = '';
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  saveItem(data) {
    this._api
    .addCard({name: data.name, link: data.link})
    .then((data) => console.log(data))
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}

