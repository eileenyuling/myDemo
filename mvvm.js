function MVVM(options) {
  this.$options = options || {};
  var data = this._data = this.$options.data;
  Object.keys(data).forEach(key => {
    this._proxyData(key);
  })
  observe(data);
  new Compiler(options.el, this);
}
MVVM.prototype = {
  _proxyData(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      get: function proxyGetter() {
        return this._data[key];
      },
      set: function proxySetter(newVal) {
        this._data[key] = newVal
      }
    })
  }
}
