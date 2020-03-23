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

router.get('/', (req, res) => {
    Food.find().then((foods) => {
        res.render('food/index', {
            foods
        })
    }).catch(err => console.log(`error`, err))
})

router.get('/food/create', (req, res) => {
    Ingredients.find().then((ingredients) => {
        res.render('food/create', {
            ingredients
        })
    })
})

router.post('/food/create', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {

        const oldpath = files.filetoupload.path;
        const imagPath = '/images/' + files.filetoupload.name;
        const uploadpath = './public/images/' + files.filetoupload.name;

        fs.rename(oldpath, uploadpath, function (err) {
            if (err) throw err;
            else {
                fields.image = imagPath;

                let food = new Food(fields);
                //save food
                food
                    .save()
                    .then(() => {
                        response.redirect("/food");
                    })
                    .catch(err => {
                        console.log(err);
                        response.send("Error!!!!!");
                    });
            }
        });
    });
})

module.exports = router