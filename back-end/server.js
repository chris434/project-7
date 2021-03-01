const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('dotenv')
const app = express()

const port = process.env.PORT || 3000

env.config()

app.use(bodyParser.json())
app.use(cors)


app.listen(port, () => {
    console.log(`listening on port${port}`)
})