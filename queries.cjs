const { Configuration, OpenAIApi } = require("openai");
const Pool = require('pg').Pool;
const regex = require('./regex.cjs')
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Configuration for openai
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);





// Gets all users from database
const getUsers = (req, res) => {
  pool.query('SELECT * FROM public.user', (error, results) => {
    if(error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};





const postQuestion = async(req, res) => {
  const template = "Example of a multiple choice question:\nQ1. What is the syntax for a for loop in Javascript?\nA. for(i=0, i < 10, i++\nB.\nC.\nD.\nAnswer: B\n\nOn a scale from 1 to 10 with 10 being the hardest and 1 being the easiest, Using the formatting of the example above, generate 5 different multiple choice 7 out of 10 difficulty javascript question."

  const chat = await openai.createChatCompletion({
    model:"gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "You are a quiz making bot."},
      {"role": "user", "content": template}
    ],
    temperature: 0.7,
    top_p: 1
  });
  console.log(chat.data.choices[0].message.content)
  const content = chat.data.choices[0].message.content.replace(/\n/g, "NEwlInE");

  let total = 5;// How many questions asked to be returned in the template
  let rowValues = `INSERT INTO public.questions (type, subject_id, question, option1, option2, option3, option4, answer) VALUES`;
  for(let i = 1; i <= total; i++){
    const NewQuestion = regex.parsingMultipleMCQ(content, i, total)
    let [question, option1, option2, option3, option4, answer] = regex.parsingMCQ(NewQuestion, i)
    if(i == total){
      rowValues += `('mcq', 1, '${question}', '${option1}', '${option2}', '${option3}', '${option4}', ${answer})`
    } else{
      rowValues += `('mcq', 1, '${question}', '${option1}', '${option2}', '${option3}', '${option4}', ${answer}),`
    }
  }

  pool.query(rowValues,(error, results) => {
    if(error){
      throw error
    }
    // console.log(results.rows)
    res.status(200).json(results.rows)
  })
};





// Gets all questions from database
const getQuestions = (req, res) => {
  pool.query(`SELECT id, type, subject_id, question, ARRAY[option1, option2, option3, option4] as choices, answer FROM public.questions`,(error, results) => {
    if(error){
      throw error
    }
    console.log(results.rows)
    res.status(200).json(results.rows)
  })
};





module.exports = {
  getUsers,
  postQuestion,
  getQuestions,
};