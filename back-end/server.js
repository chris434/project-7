const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('dotenv')
const authRoutes = require('./routes/auth-routes')
const postRoutes = require('./routes/post-routes')
const app = express()

const port = process.env.PORT || 5000
env.config()
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))
app.use('/default_images', express.static(path.join(__dirname, 'default_images')))

app.use('/backend', postRoutes)
app.use('/backend', authRoutes)



app.listen(port, () => {
    console.log(`listening on port${port}`)
})