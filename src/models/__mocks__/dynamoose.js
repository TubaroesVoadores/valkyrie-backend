export class Model {
  constructor(attributes = {}) {
    this.setData(attributes);
  }

  setData(props) {
    for (const [key, value] of Object.entries(props)) {
      if (value !== '' && value !== null && value !== undefined) {
          this[key] = value;
      }
    }
  }

  static query() {
    return this;
  }

  static exists() {
    return this;
  }

  static where() {
    return this;
  }

  static eq() {
    return this;
  }

  static and() {
    return this;
  }

  static not() {
    return this;
  }

  static exec() {
    return [];
  }

}
