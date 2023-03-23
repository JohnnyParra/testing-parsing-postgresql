//// Test for parsing function solving problems (not finished)
// const content = 'Q. Write a function `uniqueInOrder` which takes a string or an array and returns a list of items without any consecutive duplicates. The function must preserve the original order of elements.\n' +
//   '\n' +
//   "Ex. `uniqueInOrder('AAAABBBCCDAABBB')` should return `['A', 'B', 'C', 'D', 'A', 'B']`\n" +
//   '\n' +
//   'fn. function uniqueInOrder(iterable) {\n' +
//   '\n' +
//   '}\n' +
//   '\n' +
//   "test1. uniqueInOrder('AAAABBBCCDAABBB') === ['A', 'B', 'C', 'D', 'A', 'B']\n" +
//   "test2. uniqueInOrder('ABBCcAD') === ['A', 'B', 'C', 'c', 'A', 'D']\n" +
//   'test3. uniqueInOrder([1, 2, 2, 3, 3]) === [1, 2, 3]';

// console.log(content);
// const question = content.match(/Q.+/g)[0].replace(/Q./, "");
// const example = content.match(/Ex.+/g)[0].replace(/Ex./, "");
// const funct = content.match(/fn.+/g) + "}";
// const test1 = content.match(/test1.+/g)[0].replace(/test1./, "")
// const test2 = content.match(/test2.+/g)[0].replace(/test2./, "")
// const test3 = content.match(/test3.+/g)[0].replace(/test3./, "")
// console.log(question, example, funct, test1, test2, test3)





//// Regex test for parsing one multiple choice question (finished)
// const content = 'Q. What is the output of the following code in JavaScript?\n' +
// '\n' +
// '```\n' +
// 'var num1 = 5;\n' +
// 'var num2 = "10";\n' +
// 'console.log(num1 + num2);\n' +
// '```\n' +
// '\n' +
// 'A. 15\n' +
// 'B. "510"\n' +
// 'C. NaN\n' +
// 'D. "5 + 10"\n' +
// '\n' +
// 'Answer: B';

// const newContent = content.replace(/\n/g, "NEwlInE");
// const question = newContent.match(/^Q\..*?(?=A\.)/g)[0].replace(/NEwlInE/g, "\n")
// const option1 = newContent.match(/A\..*?(?=B\.)/g)[0].replace(/NEwlInE/g, "").replace(/A\./, "").trim()
// const option2 = newContent.match(/B\..*?(?=C\.)/g)[0].replace(/NEwlInE/g, "").replace(/B\./, "").trim()
// const option3 = newContent.match(/C\..*?(?=D\.)/g)[0].replace(/NEwlInE/g, "").replace(/C\./, "").trim()
// const option4 = newContent.match(/D\..*?(?=Answer)/g)[0].replace(/NEwlInE/g, "").replace(/D\./, "").trim()
// const answer = answerIndex(newContent.match(/Answer:.*/g)[0].replace(/Answer:/g, "").trim())
// console.log(`${question}${option1}\n${option2}\n${option3}\n${option4}\n${answer}`)

// function answerIndex(letter){
//   if(letter == 'A'){
//     return 0
//   } else if(letter == 'B'){
//     return 1
//   } else if(letter == 'C'){
//     return 2
//   } else return 3
// }





//// Regex test for parsing more than one multiple choice questions (not finished)
// const originalContent = 'Q1. Which keyword is used to declare a variable in JavaScript?\n' +
// 'A. int\n' +
// 'B. var\n' +
// 'C. let\n' +
// 'D. const\n' +
// 'Answer: B\n' +
// '\n' +
// 'Q2. What is the output of the following code?\n' +
// '\n' +
// '```\n' +
// 'console.log(10 + "20");\n' +
// '```\n' +
// '\n' +
// 'A. 1020\n' +
// 'B. 30\n' +
// 'C. "1020"\n' +
// 'D. "30"\n' +
// 'Answer: C\n' +
// '\n' +
// 'Q3. What is the output of the following code?\n' +
// '\n' +
// '```\n' +
// 'console.log(typeof NaN);\n' +
// '```\n' +
// '\n' +
// 'A. "number"\n' +
// 'B. "string"\n' +
// 'C. "undefined"\n' +
// 'D. "NaN"\n' +
// 'Answer: A\n' +
// '\n' +
// 'Q4. Which of the following is not a JavaScript data type?\n' +
// 'A. Boolean\n' +
// 'B. String\n' +
// 'C. Symbol\n' +
// 'D. Float\n' +
// 'Answer: D\n' +
// '\n' +
// 'Q5. What is the output of the following code?\n' +
// '\n' +
// '```\n' +
// 'let arr = [1, 2, 3];\n' +
// 'console.log(arr instanceof Array);\n' +
// '```\n' +
// '\n' +
// 'A. true\n' +
// 'B. false\n' +
// 'C. TypeError\n' +
// 'D. undefined\n' +
// 'Answer: A';

// const newContent = originalContent.replace(/\n/g, "NEwlInE");

function parsingMultipleMCQ(content, num, total){
  let regex;
  if(total == 1){
    return content
  } else if (total == num){
    regex = new RegExp(`Q${num}\\..*`)
  } else{
    regex = new RegExp(`Q${num.toString()}\\..*?(?=Q${(num + 1).toString()}\\.)`)
  }
  return content.match(regex)[0];
}

function parsingMCQ(content, num){
  let regex = new RegExp(`Q${num.toString()}\\..*?(?=A\\.)`);
  let questionRegex = new RegExp(`Q${num.toString()}\\.`)
  const question = content.match(regex)[0].replace(/NEwlInE/g, "\n").replace(questionRegex, "").trim();
  const option1 = content.match(/A\..*?(?=B\.)/g)[0].replace(/NEwlInE/g, "").replace(/A\./, "").trim();
  const option2 = content.match(/B\..*?(?=C\.)/g)[0].replace(/NEwlInE/g, "").replace(/B\./, "").trim();
  const option3 = content.match(/C\..*?(?=D\.)/g)[0].replace(/NEwlInE/g, "").replace(/C\./, "").trim();
  const option4 = content.match(/D\..*?(?=Answer)/g)[0].replace(/NEwlInE/g, "").replace(/D\./, "").trim();
  const answer = answerIndex(content.match(/Answer:.*/g)[0].replace(/NEwlInE/g, "").replace(/Answer:/g, "").trim());
  return [question, option1, option2, option3, option4, answer]
}

// let total = 5;
// let rowValues = `INSERT INTO public.questions (type, subject_id, question, option1, option2, option3, option4, answer) VALUES`;
// for(let i = 1; i <= total; i++){
//   const NewQuestion = parsingMultipleMCQ(newContent, i, total)
//   let [question, option1, option2, option3, option4, answer] = parsingMCQ(NewQuestion, i)
//   if(i == total){
//     rowValues += `('mcq', 1, '${question}', '${option1}', '${option2}', '${option3}', '${option4}', ${answer})`
//   } else{
//     rowValues += `('mcq', 1, '${question}', '${option1}', '${option2}', '${option3}', '${option4}', ${answer}),`
//   }
// }

function answerIndex(letter){
  console.log(letter)
  if(letter == 'A'){
    return 0
  } else if(letter == 'B'){
    return 1
  } else if(letter == 'C'){
    return 2
  } else return 3
};

module.exports = {
  answerIndex,
  parsingMCQ,
  parsingMultipleMCQ,
};