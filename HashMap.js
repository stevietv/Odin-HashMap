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
    return this.buckets[this.hash(key)].contains(key);
  }

  get(key) {

    let bucket = this.buckets[this.hash(key)];
    let index = bucket.find(key);

    if (index === null)
      return null;
    else
      return bucket.at(index).value;
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