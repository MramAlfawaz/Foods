const mongoose = require('mongoose')

const ingredientsSchema = mongoose.Schema({
    name: String,
    image: String,
    food: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }]
}, {
    timestamp: true
})

const Food = mongoose.model('Ingredients', ingredientsSchema)

module.exports = Food