function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.depIds = {};
  this.getter = this.parseGetter(exp);
  this.value = this.get()
}
Watcher.prototype = {
  parseGetter(exp) {
    var exps = exp.split('.');
    return function(obj) {
      var val = obj;
      exps.forEach(key => {
        val = obj[key]
      })
      return val;
    }
  },
  addDep(dep) {
    if (this.depIds.hasOwnProperty(dep.id)) {
      return;
    }
    dep.addSub(this);
    this.depIds[dep.id] = dep;
  },
  get() {
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  },
  update() {
    var value = this.get();
    var oldValue = this.value;
    if (value === oldValue) {
      return;
    }
    this.value = value;
    this.cb.call(this.vm, value, oldValue);
  }
}
