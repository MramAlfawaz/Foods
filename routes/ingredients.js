const express = require('express')
const mongoose = require('mongoose')
const moment = require('moment')
const methodOR = require('method-override')
const router = express.Router()
const expressLayouts = require('express-ejs-layouts')
const formidable = require('formidable')
const fs = require('fs')

// Models
const Food = require('../models/Food')
const Ingredients = require('../models/Ingredients')


router.use(methodOR('_method'))
router.use(expressLayouts);

router.use(express.urlencoded({
    extended: true
}))

router.get('/ingredients', (req, res) => {
    Ingredients.find().then((Ingredient) => {
        res.render('ingredients/index', {
            Ingredient
        })
    }).catch(err => console.log(`error`, err))
})

router.get('/ingredients/create', (req, res) => {
    Ingredients.find().then((ingredient) => {
        res.render('ingredients/create', {
            ingredient
        })
    })
})

router.post('/ingredients/create', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        const oldpath = files.filetoupload.path;
        const imagPath = '/images/' + files.filetoupload.name;
        const uploadpath = './public/images/' + files.filetoupload.name;

        fs.rename(oldpath, uploadpath, function (err) {
            if (err) throw err;
            else {
                fields.image = imagPath;
                let ingredients = new Ingredients(fields);
                // food.push(fields.ingredients)
                //save food
                ingredients
                    .save()
                    .then(() => {
                        res.redirect("/ingredients");
                    })
                    .catch(err => {
                        console.log(err);
                        res.send("Error!!!!!");
                    });
            }
        });
    });
})

module.exports = router