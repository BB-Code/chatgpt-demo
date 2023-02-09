import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let dataSource = []


document.getElementById('btn').addEventListener('click', () => {
  if (document.getElementById('question').value) {
    document.querySelector('.content').innerHTML = '加载中...'
    openai.createCompletion({
      model: "text-davinci-003",
      prompt: document.getElementById('question').value,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((res) => {
      console.log(res.data.choices[0].text)
      if (res.data.choices[0].text.includes('```')) {
        document.querySelector('.pre').style.display = 'block'
        document.querySelector('.pre').innerText = res.data.choices[0].text;
      } else {

        document.querySelector('.content').innerText = res.data.choices[0].text;
      }
      dataSource.push({
        question: document.getElementById('question').value,
        answer: res.data.choices[0].text
      })
      localStorage.setItem('dataSource', JSON.stringify(dataSource))
    })
  }
})

