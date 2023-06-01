const express = require('express');
const axios = require('axios');

const app = express() 
const PORT = 3000;
const OPENAI_API_KEY = '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'

app.use(express.json());

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Service is up')
})
app.get('/test', (req, res) => {
  console.log("Just got a request!")
  res.send('Service is up')
})
app.post('/chat', async (req, res) => {
  try {
    //let message = {"role": "user", "content": req.body.message}
    //console.log(req);
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: req.body.messages,
      //max_tokens: 50,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ response: response });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
});


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})