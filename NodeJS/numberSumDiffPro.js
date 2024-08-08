// ----------Day-1---------

// const num1 = 14
// const num2 = 17

// console.log(`Sum of ${num1} and ${num2} is ${num1+num2}`)
// console.log(`Difference of ${num1} and ${num2} is ${num1-num2}`)
// console.log(`Product of ${num1} and ${num2} is ${num1*num2}`)

// ------------------------

// ----------Day-2---------

// const str = "mashup stack is a software training institute"

// function findMaxLengthWord(words){
//     str_arr = words.split(" ")

//     console.log(str_arr)

//     lengthOfEachWords = []

//     for(i=0;i<str_arr.length;i++){
//         lengthOfEachWords.push(str_arr[i].length)
//     }

//     console.log(lengthOfEachWords)

//     console.log(`The highest word length is ${Math.max(...lengthOfEachWords)}`)
//     const indexOfLargeWord = lengthOfEachWords.indexOf(Math.max(...lengthOfEachWords))
//     console.log(`The highest length word is ${str_arr[indexOfLargeWord]}`);
// }

// findMaxLengthWord(str)

// ------------------------

// ----------Day-3---------

// const prompt = require('prompt');

// prompt.message = 'Enter Three Numbers (comma-separated):';

// prompt.delimiter = '';

// prompt.get(['details'], (err, result) => {
//   const [Number1, Number2, Number3] = result.details.split(',');
//   console.log(`Number 1: ${Number1}, Number 2: ${Number2}, Number 3: ${Number3}`);
//   console.log(`Average of these three numbers is ${(Number(Number1)+Number(Number2)+Number(Number3))/3}`);
// });


// ------------------------

// ------------Day-4----------

var operations = require("./operationModule.js")

var num1 = 10
var num2 = 20
var operationsAre = ['addition','substraction','division','multiply']

operationsAre.map((operand)=>{
  console.log(operations[operand](num1,num2));
})

// ---------------------------