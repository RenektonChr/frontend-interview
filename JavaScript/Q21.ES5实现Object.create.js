// 手写Object.create
Object.create = function(prototype, properties) {
  if(typeof prototype !== 'object') {
    throw TypeError();
  }

  function Ctor() {}

  Ctor.prototype = prototype;
  var o = new Ctor();
  if(prototype) {
    o.contructor = Ctor;
  }

  if(properties !== undefined) {
    if(properties !== Object(properties)) {
      throw TypeError(); 
    }
    Object.defineProperties(o, properties);
  }

  return o;
}

const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person, { aa: { value: 45 } });

console.log('me--->', me);
