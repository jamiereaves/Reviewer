const Product = require("../models/Product");
const mongoose = require("mongoose");
const User = require("../models/User");
const Review = require("../models/Review");
const Reply= require("../models/Reply");

module.exports = function(app) {

  app.get("/api/product", function(req, res){
    //console.log(req.body);
   // console.log(vault.read(req));
      Product.find({}).then(dbModel => res.json(dbModel));
  });

  app.get("/api/product/:id", function(req, res){
   // console.log(req.body);
      Product.findOne({_id:req.params.id})
      .populate({path:'reviews',
      populate: { path: 'replies' }
    })
      //.populate('replies')
      .exec( function(err, dbreply) {
       // console.log(dbreply);
        if (err) {res.json(err)};
          res.json(dbreply);
      });
      //.then(dbModel => res.json(dbModel));
  });

  app.post("/api/product",  function(req, res){
      //console.log(req.body);
     // console.log(req.session.uid);
      Product.create(req.body).then(dbModel => {
        //update user
        User.findByIdAndUpdate(req.session.uid, { "$push": { "products": dbModel._id } },
        { "new": true, "upsert": true }).then(dbreply=> {
          console.log(dbreply);
          res.json(dbModel);
        });
        //res.json(dbModel)
      });
  });
}