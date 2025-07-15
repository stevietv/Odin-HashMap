class Node {
  constructor (key, value) {
    this.key = key;
    this.value = value || null;
    this.nextNode = null;
  }
}

export default Node;