const x = 10;
const y = "Yuri";
const z = [1, 2];

console.log(x, y, z);

// count
console.count(`The value of x is ${x}, contagem`);
console.count(`The value of x is ${x}, contagem`);
console.count(`The value of x is ${x}, contagem`);
console.count(`The value of x is ${x}, contagem`);

// variable between strings
console.log("The name is %s, and he is programmer", y);

// clear console
setTimeout(() => {
  console.clear();
}, 2000);
