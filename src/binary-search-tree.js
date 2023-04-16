const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return this;
    }

    let currentNode = this.rootNode;
    while (true) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  find(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    let currentNode = this.rootNode;
    let parentNode = null;
    while (currentNode) {
      if (data === currentNode.data) {
        if (currentNode.left === null && currentNode.right === null) {
          if (parentNode === null) {
            this.rootNode = null;
          } else if (currentNode === parentNode.left) {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
        } else if (currentNode.left === null) {
          if (parentNode === null) {
            this.rootNode = currentNode.right;
          } else if (currentNode === parentNode.left) {
            parentNode.left = currentNode.right;
          } else {
            parentNode.right = currentNode.right;
          }
        } else if (currentNode.right === null) {
          if (parentNode === null) {
            this.rootNode = currentNode.left;
          } else if (currentNode === parentNode.left) {
            parentNode.left = currentNode.left;
          } else {
            parentNode.right = currentNode.left;
          }
        } else {
          let minRightNode = currentNode.right;
          while (minRightNode.left !== null) {
            minRightNode = minRightNode.left;
          }
          const temp = minRightNode.data;
          this.remove(temp);
          currentNode.data = temp;
        }
        return true;
      } else if (data < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  min() {
    let currentNode = this.rootNode;
    while (currentNode && currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode ? currentNode.data : null;
  }

  max() {
    let currentNode = this.rootNode;
    while (currentNode && currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode ? currentNode.data : null;
  }
}

module.exports = {
  BinarySearchTree
};