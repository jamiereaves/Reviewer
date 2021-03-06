const Reply= require("../models/Reply");
const mongoose = require("mongoose");
const User = require("../models/User");
const Review = require("../models/Review");
const verify=require("./verify");

module.exports = function(app) {

  app.get("/api/reply/", function(req, res){
     // console.log(req.body);
     // console.log(vault.read(req));
      Reply.find({}).then(dbModel => res.json(dbModel));
  });

  app.get("/api/reply/:id", function(req, res){
    //console.log(req.body);
    Reply.findOne({id:req.params.id}).then(dbModel => res.json(dbModel));
  });
  
  app.post("/api/reply",  async function(req, res){
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }
      //console.log(req.body);
      //console.log(req.session.uid);
      newreply=req.body;
      //console.log(req.session.username)
      //newreply.user=req.session.uid;
      newreply.username=req.session.username;
      newreply.user=req.session.uid;
      console.log(newreply);
      Reply.create(newreply).then(dbModel => {
       // //update user
        User.findByIdAndUpdate(req.session.uid, { "$push": { "replies": dbModel._id } },
        { "new": true, "upsert": true }).then(dbreply=> {
          //console.log(dbreply)
                  //update review 
          Review.findByIdAndUpdate(req.body.parentReview, { "$push": { "replies": dbModel._id } },
          { "new": true, "upsert": true }).then(dbreply=> {
            //console.log(dbreply)
            res.json(dbModel);
          });
        });

        //res.json(dbModel)
      });
  });
  app.post("/api/reply/search/:query", function(req, res){
    var re = new RegExp(req.params.query, 'i');
    Reply.find().or([{ 'description': { $regex: re }}, { 'title': { $regex: re }}, { 'catagories': { $regex: re }}]).sort({'dateCreated': 1}).exec(function(err, users) {
      res.json(JSON.stringify(users));
  });
  });

  app.delete("/api/reply/:id", async function(req, res){
    if(!await verify.loggedin(req)){
      console.log("failed validation")
      res.status(401).send({success: false, message: "you are not logged in"});
      return;
    }

    Reply.deleteOne({id:req.params.id}).then(dbreply=>{
      res.json(dbreply)
    })
  })

  

}