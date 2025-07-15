import Node from './Node.js';

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    let newNode = new Node(key,  value);
    if (this.head === null) {
      this.head = newNode;
    }

    else {
      let currentNode = this.head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
  }

  prepend(key, value) {
    let newNode = new Node(key,  value);
    newNode.nextNode = this.head;
    this.head = newNode;
  }

  pop() {
    if (this.head === null) {
      return null
    }

    if (this.head.nextNode === null) {
      const nodeToReturn = this.head;
      this.head = null; // Only one node
      return nodeToReturn;
    }

    let currentNode = this.head;
    while (currentNode.nextNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    const nodeToReturn = currentNode.nextNode;
    currentNode.nextNode = null;
    return nodeToReturn;
  }

  size() {
    let size = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      size++;
    }
    return size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let currentNode = this.head;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  at(index) {
    let currentNode = this.head;
    for (let i = 0; i < index; ++i) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  contains(key) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key.localeCompare(key, undefined, {sensitivity: 'accent'}) === 0) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(key) {
    let currentNode = this.head;
    let index= 0;
    while (currentNode !== null) {
      if (currentNode.key.localeCompare(key, undefined, {sensitivity: 'accent'}) === 0) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    if (this.head === null) {
      return "null";
    }

    let outputString = "";
    let currentNode = this.head;

    while (currentNode !== null) {
      outputString += `( ${currentNode.value} ) -> `
      currentNode = currentNode.nextNode;
    }

    outputString += `null`
    return outputString;
  }

  insertAt(index, key, value) {
    if (this.size() < index){
      this.append(value);
    }
    else if (index === 0) {
      this.prepend(value);
    }

    else {
      let newNode = new Node(key, value);
      let currentNodeAtPreviousIndex = this.at(index-1);
      let currentNodeAtIndex = this.at(index);

      newNode.nextNode = currentNodeAtIndex;
      currentNodeAtPreviousIndex.nextNode = newNode;
    }
  }

  removeAt(index) {
    if (index <= this.size()) {
      let currentNodeAtPreviousIndex = this.at(index - 1);
      currentNodeAtPreviousIndex.nextNode = this.at(index + 1);
    }
  }

  updateAt(index, value) {
    let node = this.at(index);
    node.value = value;
  }
}

export default LinkedList;