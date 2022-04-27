const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
app.use(express.json())
const axios = require('axios')
const cors = require('cors')
app.use(cors())
const nltKey = 'Basic YXBpa2V5Ol93MkpfVG5menZDZ3J4THhndmhjT2tjZHZYc2hWU3NaLUpsMm9nU3BXRW9q';
const nltUrl = 'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/8e9e1888-02df-45b9-b2c6-6f9ea5d41a3f/v3/translate?version=2018-05-01'
app.get('/', (req, res) => {
  res.json({ message: "welcome IBM  DEBI project by Mahmoud Elwan" })
})
app.post("/hello", (req, res) => {
  res.json({ message: "Done", data: req.body })
})
app.post('/nlt', async (req, res) => {
  try {
    const { data } = req.body
    const result = await axios.post(nltUrl, data, {
      headers: {
        'content-type': 'application/json',
        authorization: nltKey,
      }
    })
    // res.json({ message: "Done", results: result.data.translations[0].translation })

    const dataD = result.data.translations[0].translation;
    const discoveryKey = 'Basic YXBpa2V5OkwyNUYxX2JxRlZGbkxlZjhCclVzam5XaEVTTi1WbEk0Q2pxNFY1OHktNGlC';
    const discoveryUrl = `https://api.eu-gb.discovery.watson.cloud.ibm.com/instances/05377d80-18cc-4143-ae74-5cad398c4f22/v1/environments/fe74afd1-dbc8-40cf-b032-133b1c5847ab/collections/e19f65da-dffb-4c1e-b88f-90507e4caaaa/query?version=2018-12-03&aggregation=nested%28enriched_text.entities%29.term%28enriched_text.entities.type%2Ccount%3A5%29.term%28enriched_text.entities.text%29&highlight=true&passages.count=5&natural_language_query=${dataD}`
    const result2 = await axios.get(discoveryUrl, {
      headers: {
        'content-type': 'application/json',
        authorization: discoveryKey,
      }
    })
    res.json({ message: "Done", results: result2.data })
  } catch (error) {
    res.json({ message: "catch error", error })
  }

})

app.get('/discovery', async (req, res) => {
  try {

    const { data } = req.query;
    const discoveryKey = 'Basic YXBpa2V5OkwyNUYxX2JxRlZGbkxlZjhCclVzam5XaEVTTi1WbEk0Q2pxNFY1OHktNGlC';
    const discoveryUrl = `https://api.eu-gb.discovery.watson.cloud.ibm.com/instances/05377d80-18cc-4143-ae74-5cad398c4f22/v1/environments/fe74afd1-dbc8-40cf-b032-133b1c5847ab/collections/b2ad7aac-89f7-43de-a4b3-d07a22cb7ebc/query?version=2018-12-03&aggregation=nested%28enriched_text.entities%29.term%28enriched_text.entities.type%2Ccount%3A5%29.term%28enriched_text.entities.text%29&highlight=true&passages.count=5&query=${data}`
    const result = await axios.get(discoveryUrl, {
      headers: {
        'content-type': 'application/json',
        authorization: discoveryKey,
      }
    })
    res.json({ message: "Done", results: result.data })
  } catch (error) {
    res.json({ message: "catch error", error })
  }

})




const data = {
  "text": "I love apples! I do not like oranges.",
  "features": {
    "sentiment": {
      "targets": [
        "apples",
        "oranges",
        "broccoli"
      ]
    },
    "keywords": {
      "emotion": true
    }
  }
}
const apikey = 'Basic YXBpa2V5Om1UQzhSdkJMV1pTZkc2Vk9JYTVkX1BfcjU3VXc4aTZsVHBCd21haDkwc3Zn';
const url = 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/6cc84c7f-6b8d-4733-b7e6-3a24cf37f6af/v1/analyze?version=2019-07-12';
app.get('/nlu', async (req, res) => {
  try {

    const result = await axios.post(url, data, {
      headers: {
        'content-type': 'application/json',
        authorization: apikey,
      }
    })
    res.json({ message: "Done", results: result.data })
  } catch (error) {
    res.json({ message: "catch error", error })
  }

})



app.post('/about', (req, res) => {

  console.log(req.headers);
  res.json('end')
})


// const fs = require('fs');
// const DiscoveryV1 = require('ibm-watson/discovery/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const discovery = new DiscoveryV1({
//   version: '2019-04-30',
//   authenticator: new IamAuthenticator({
//     apikey: 'PGFvPp3FaVQpWzg_ZNi2c0aF28B7hGK_dMs6EsGHozUo',
//   }),
//   url: 'https://api.eu-gb.discovery.watson.cloud.ibm.com/instances/6b76f4dc-d147-4b3e-9c67-07dd09dff835',
// });

// const addDocumentParams = {
//   environmentId: '{environment_id}',
//   collectionId: '{collection_id}',
//   file: fs.createReadStream('./test-doc1.html'),
// };

// discovery.addDocument(addDocumentParams)
//   .then(response => {
//     const documentAccepted = response.result;
//     console.log(JSON.stringify(documentAccepted, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))