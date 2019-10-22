const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const axios = require('axios')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
// app.use(bodyParser.json());
app.use(bodyParser.json({
  limit: '50mb', extended: true,
   urlencoded: {limit: '50mb', extended: true}}));
app.use(bodyParser.urlencoded({ extended: false }))

app.set('trust proxy', true)


//RE ADD TOKEN
const token = "";

app.get("/", (req, res) => {
    if (req.query.token !== token) {
        return res.sendStatus(401);
    } 

    return res.end(req.query.challenge);
})

app.post('/', (req, res) => {
    if (req.query.token !== token) {
        return res.sendStatus(401);
    }

    console.log("\n");
    console.log(req.body, 'BODY');
    console.log("\n");
    console.log(req.body.result.sessionParameters, 'SESSION PARAMETERS');

    const data = {
        responses: [
            {
                type: 'text',
                elements: ["You have successfully connected to the Chatbot Webhook"]
            }
        ]
    };

    res.json(data);
})

let port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`[Chatbot] Webhook is listening on port ${port}`);
});


