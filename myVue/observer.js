function Observer(data) {
  this.walk(data);
}
Observer.prototype = {
  walk(data) {
    Object.keys(data).forEach(key => {
      var val = data[key];
      var dep = new Dep();
      observe(val);
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
          if (Dep.target) {
            dep.depend()
          }
          return val;
        },
        set: function(newVal) {
          val = newVal;
          dep.notify()
        }
      })
    });
  }
}

function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  new Observer(obj);
}

var uid = 0;
function Dep() {
  this.subs = [];
  this.id = uid++;
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  depend() {
    Dep.target.addDep(this)
  },
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
Dep.target = null