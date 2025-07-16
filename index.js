import HashMap from './HashMap.js';

let hashMap = new HashMap(0.75,16);

hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
hashMap.set('dog', 'brown');
hashMap.set('elephant', 'gray');
hashMap.set('frog', 'green');
hashMap.set('grape', 'purple');
hashMap.set('hat', 'black');
hashMap.set('ice cream', 'white');
hashMap.set('jacket', 'blue');
hashMap.set('kite', 'pink');
hashMap.set('lion', 'golden');
hashMap.set('tiger', 'orange');
hashMap.set('cat', 'ginger');
console.log(hashMap);
console.log(hashMap.length()); // 14
console.log(hashMap.get('lion') === 'golden'); //true
console.log(hashMap.get('liger')); //null
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
console.log(hashMap.remove('liger'))
console.log(hashMap.remove('dog'))
console.log(hashMap.entries());
