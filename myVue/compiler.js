function Compiler(el, vm) {
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  this.$vm = vm;
  if (this.$el) {
    this.$fragment = this.nodeToFragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compiler.prototype = {
  isElementNode(node) {
    return node.nodeType === 1;
  },
  isTextNode(node) {
    return node.nodeType === 3;
  },
  isDirective(attrName) {
    return attrName.indexOf('v-') === 0;
  },
  nodeToFragment(el) {
    var fragment = document.createDocumentFragment();
    var child;
    while(child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  },
  init() {
    this.compileElement(this.$fragment);
  },
  compileElement(el) {
    var childNodes = el.childNodes;
    Array.prototype.slice.call(childNodes).forEach(node => {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;
      if (this.isElementNode(node)) {
        this.compile(node);
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, RegExp.$1.trim());
      }
      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node);
      }
    })
  },
  compileText(node, exp) {
    compileUtils.text(this.$vm, node, exp);
  },
  compile(node) {
    var attrs = node.attributes;
    Array.prototype.slice.call(attrs).forEach(attr => {
      var attrName = attr.name;
      if (this.isDirective(attrName)) {
        var exp = attr.value;
        var type = attrName.substring(2);
        compileUtils[type] && compileUtils[type](this.$vm, node, exp)
      }
    })
  }
}

var compileUtils = {
  text(vm, node, exp) {
    this.bind(vm, node, exp, 'text');
  },
  model(vm, node, exp) {
    this.bind(vm, node, exp, 'model');
    var val = this._getVMVal(vm, exp);
    node.addEventListener('input', (e) => {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      this._setVMVal(vm, exp, newValue);
      val = newValue;
    })
  },
  bind(vm, node, exp, type) {
    var updaterFn = updater[`${type}Updater`];
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))
    new Watcher(vm, exp, (value, oldValue) => {
      updaterFn  && updaterFn(node, value, oldValue);
    });
  },
  _getVMVal(vm, exp) {
    var val = vm;
    var exps = exp.split('.');
    exps.forEach(key => {
      val = val[key];
    })
    return val;
  },
  _setVMVal(vm, exp, newValue) {
    var val = vm;
    var exps = exp.split('.');
    exps.forEach((k, i) => {
      if (i === exps.length - 1) {
        val[k] = newValue
      } else {
        val = val[k]
      }
    })
  }
}

var updater = {
  textUpdater(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  modelUpdater(node, value) {
    node.value = typeof value === 'undefined' ? '' : value
  }
}