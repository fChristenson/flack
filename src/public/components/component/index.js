const createElement = require("../../lib/createElement");
const store = require("../../lib/store");

class Component {
  constructor(props = {}) {
    this.refs = {};
    this.state = {};
    this.props = props;
    this.children = {};
    this.dispatch = store.dispatch.bind(this);
    this.setChild = this.setChild.bind(this);
    this.setReducer = this.setReducer.bind(this);
    this.setSubscriber = this.setSubscriber.bind(this);
  }

  getStoreState() {
    return store.state;
  }

  setReducer(name, reducer, initState = {}) {
    store.setReducer(name, reducer, initState);
  }

  setSubscriber(name, subscriber) {
    store.setSubscriber(name, subscriber);
  }

  setChild(name, child) {
    this.children[name] = createElement(child);
  }
}

module.exports = Component;
