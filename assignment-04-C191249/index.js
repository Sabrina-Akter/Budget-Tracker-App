// Import NPM Package
const _ = require('underscore');
// Call appropriate function from the NPM package to solve the assignment

const array = ["Java", "Javascript", "Typescript"];

/**
 * Print out the result if ["Java", "Javascript", "Typescript"] this array 
 * contains "Java"
 */
// First Answer 
console.log("The array contains Java:", _.contains(array, "Java")); 


/**
 * Print out the result if ["Java", "Javascript", "Typescript"] this array 
 * contains "C++"
 */
// Second Answer
console.log("The array contains C++:", _.contains(array, "C++")); 