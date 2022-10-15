const _ = require("lodash");

const firstList = [1, 2, 3, 4, 5];
const secondList = [6, 7, 8, 9, 10];

const diff = _.difference(firstList, secondList);

console.log(diff);
