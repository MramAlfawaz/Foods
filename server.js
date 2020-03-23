const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000

const foodRoute = require('./routes/food')
const ingredientsRoute = require('./routes/ingredients')



const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(foodRoute)
app.use(ingredientsRoute)
app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/Food', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log(`connected to DB`))


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))