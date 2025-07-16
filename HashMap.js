import LinkedList from './LinkedList/LinkedList.js';

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => (new LinkedList()));
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[keyHash];

    // first check if the key exists, and if so only update it
    if (this.has(key)) {
      let index = bucket.find(key);
      bucket.updateAt(index, value);
    }
    else {
      bucket.append(key, value);
    }

    // after adding resize if size is over the load factor
    if (this.isOverLoadFactor()) {
        this.resize();
    }
  }

  has(key) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[keyHash].contains(key);
  }

  get(key) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[keyHash];
    let index = bucket.find(key);

    if (index === null)
      return null;
    else
      return bucket.at(index).value;
  }

  remove(key) {
    let keyHash = this.hash(key);
    if (keyHash < 0 || keyHash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[keyHash];
    let index = bucket.find(key);

    if (index === null)
      return false;
    else {
      bucket.removeAt(index);
      return true;
    }
  }

  isOverLoadFactor() {
    let currentLoadFactor = this.length() / this.capacity;
    return (currentLoadFactor >= this.loadFactor);
  }

  length() {
    let count = 0;
    this.buckets.forEach((bucket) => {
      count += bucket.size();
    });
    return count;
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array.from({ length: this.capacity }, () => (new LinkedList()));
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.getHead();
      while (currentNode !== null) {
        keys.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    })
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.getHead();
      while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    })
    return values;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.getHead();
      while (currentNode !== null) {
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      }
    })
    return entries;
  }

  resize() {
    let oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => (new LinkedList()));

    oldBuckets.forEach((bucket) => {
      let node = bucket.pop()
      while (node !== null) {
        this.set(node.key, node.value);
        node = bucket.pop();
      }
    })
  }
}

export default HashMap;