const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: String,
    image: String,
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredients"
    }]
}, {
    timestamp: true
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food