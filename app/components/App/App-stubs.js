export class LocalStorageMock {
  constructor() {
    this.store = {
      submitted: JSON.stringify({ key: 'someValue' }),
    };
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export const response = {
  body: 'String',
  to: '5555555',
  from: '1111111',
  tone: '',
  toneView: false,
};
