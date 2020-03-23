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

router.post("/food/create", (request, response) => {
  console.log(request.body);
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {

       var oldpath = files.filetoupload.path;
      var imagPath = '/images/' + files.filetoupload.name;
      var uploadpath = './public/images/' + files.filetoupload.name;

      fs.rename(oldpath, uploadpath, function (err) {
        if (err) throw err;
        else
        {
     console.log("before",  fields);
      fields.image = imagPath;
      console.log("after",fields);


      //
      let food = new Food(fields);
      console.log(food);

          //console.log(author);
          //save author
          food
            .save()
            .then(() => {
              response.redirect("/");
            })
            .catch(err => {
              console.log(err);
              response.send("Error!!!!!");
            });
        }
      });
    });
});


// router.post('/food/create', (req, res) => {
//     const form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {

//         const oldpath = files.filetoupload.path;
//         const imagPath = '/images/' + files.filetoupload.name;
//         const uploadpath = './public/images/' + files.filetoupload.name;

//         fs.rename(oldpath, uploadpath, function (err) {
//             if (err) throw err;
//             else {
//                 // fields.image = imagPath;
//                 // let food = new Food(fields);
//                 // // food.ingredients.push(fields.ingredients)
//                 // console.log(req.body.ingredients);
//                 // //save food
//                 // req.body.image = imagPath
//                 let fooda = new Food(req.body);
//                 console.log(req.body);
//                 fooda
//                     .save()
//                     .then(() => {
//                         //save it to authors as well
//                         req.body.fooda.forEach(fooda => {
//                             Food.findById(fooda, (err, fooda) => {
//                                 fooda.ingredients.push(ingredients);
//                                 fooda.save();
//                             })
//                         })
//                         //   response.send("Post worked!!");
//                         // response.redirect("/");
//                         res.redirect("/");
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         response.send("Error!!!!!");
//                     });
//                 // 
//                 // food
//                 //     .save()
//                 //     .then(() => {
//                 //         res.redirect("/");
//                 //     })
//                 //     .catch(err => {
//                 //         console.log(err);
//                 //         res.send("Error!!!!!");
//                 //     });
//             }
//         });
//     });
// })

module.exports = router