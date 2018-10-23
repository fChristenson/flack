const selector = "[data-ref], [data-child]";

const replaceNode = (childName, childElement) => element => {
  if (element.getAttribute("data-child") === childName) {
    element.parentNode.replaceChild(childElement, element);
  }
};

const makeCreateElement = domParser => {
  return component => {
    const doc = domParser.parseFromString(component.render(), "text/html");
    const children = Object.keys(component.children);
    const elements = doc.querySelectorAll(selector);

    elements.forEach(element => {
      const ref = element.getAttribute("data-ref");
      if (ref) {
        component.refs[ref] = element;
      }
    });

    children.forEach(childName => {
      const childElement = component.children[childName];
      elements.forEach(replaceNode(childName, childElement));
    });

    delete component.children;

    return doc.body.firstChild;
  };
};

module.exports = makeCreateElement;
