const express = require('express')
const app = express()
const fetch = require('node-fetch')
const cors = require('cors')

app.use(cors())

app.get('/twitter-search', async function (req, res) {
    const {q, count= 10} = req.query
    if(q) {
        console.log("Received search term: " + q);
        try {
            const response = await fetch(`https://api.twitter.com/1.1/search/tweets.json?q=${q}&count=${count}'`,{
                headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANTMMwEAAAAALkgzd3eXE95jcu3G2GXwLu%2FWGbU%3DiDwNE6K9fcUjH6zNcmRZeUsPmb0KfGutb38SCIbbNxJHOMH4t0",
                }
            })
            const data = await response.json()
            res.status(200).send(JSON.stringify(data))
        } catch (err) {
            console.log("Error: " + err.message);
            res.status(500).send(JSON.stringify(err.message))
        }
    }
    else {
        res.status(500).send(JSON.stringify('No Search Term recieved'))
    }
})

app.listen(8080, function() {
    console.log('Server is listening on port 8080')
});