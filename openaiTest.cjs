const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);





//// Testing openAI response along with parsing it for a multiple choice question

// const template = "Example of a multiple choice question:\nQ. What is the syntax for a for loop in Javascript?\nA. for(i=0, i < 10, i++\nB.\nC.\nD.\nAnswer: B\n\nOn a scale from 1 to 10 with 10 being the hardest and 1 being the easiest, Using the formatting of the example above, generate one multiple choice 7 out of 10 difficulty javascript question."
// async function runChat(){
//   const chat = await openai.createChatCompletion({
//     model:"gpt-3.5-turbo",
//     messages: [
//       {"role": "system", "content": "You are a quiz making bot."},
//       {"role": "user", "content": template}
//     ],
//     temperature: 0.7,
//     top_p: 1
//   })
//   console.log(chat.data.choices[0].message)
//   const content = chat.data.choices[0].message.content.replace(/\n/g, "NEwlInE");
//   const question = content.match(/^Q\..*?(?=A\.)/g)[0].replace(/NEwlInE/g, "\n")
//   const option1 = content.match(/A\..*?(?=B\.)/g)[0].replace(/NEwlInE/g, "").replace(/A\./, "").trim()
//   const option2 = content.match(/B\..*?(?=C\.)/g)[0].replace(/NEwlInE/g, "").replace(/B\./, "").trim()
//   const option3 = content.match(/C\..*?(?=D\.)/g)[0].replace(/NEwlInE/g, "").replace(/C\./, "").trim()
//   const option4 = content.match(/D\..*?(?=Answer)/g)[0].replace(/NEwlInE/g, "").replace(/D\./, "").trim()
//   const answer = answerIndex(content.match(/Answer:.*/g)[0].replace(/Answer:/g, "").trim())
//   console.log(`${question}${option1}\n${option2}\n${option3}\n${option4}\n${answer}`)
// };
// runChat();

// function answerIndex(letter){
//   if(letter == 'A'){
//     return 0
//   } else if(letter == 'B'){
//     return 1
//   } else if(letter == 'C'){
//     return 2
//   } else return 3
// };





const template = "Example of a multiple choice question:\nQ1. What is the syntax for a for loop in Javascript?\nA. for(i=0, i < 10, i++\nB.\nC.\nD.\nAnswer: B\n\nOn a scale from 1 to 10 with 10 being the hardest and 1 being the easiest, Using the formatting of the example above, generate 5 multiple choice 7 out of 10 difficulty javascript questions.";

async function runChat(){
  const chat = await openai.createChatCompletion({
    model:"gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "You are a quiz making bot."},
      {"role": "user", "content": template}
    ],
    temperature: 0.7,
    top_p: 1
  })
  console.log(chat.data.choices[0].message)
};
runChat();