const express = require('express')
const mongoose = require("mongoose")
const app = express()
const PORT = 5000;
const {MONGOURI} = require('./keys')
const AuthRouter = require("./routes/auth")



// mongoose.model('users')


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 
mongoose.connection.on('connected', () => {
    console.log('connected to mongoDb')
})

mongoose.connection.on('error', (err) => {
    console.log('err connecting', err)
})

require('./models/users')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use("/", AuthRouter)


app.listen(PORT, () => {
    console.clear()
    console.log('server is running at', PORT)
})