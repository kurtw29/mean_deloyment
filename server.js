// Express

const express = require('express');
const app = express();

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public/dist/public'));

// set up mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/movies');
var ReviewSchema = new mongoose.Schema({
    name: {type: String, required: [true, "A name must be provided"], minlength: [3, "A name must contain at least 3 characters"], default: ""},
    star: {type: Number, required: [true, "a rating is required"]},
    review: {type:String, required:[true, "A review is required to submit a movie"], minlength:[3, "Review must have at least 3 characters"]}
})
var BeltSchema = new mongoose.Schema({
    title: {type: String, required:[true, "Title must be provided"], minlength:[3, "Title must have at least 3 characters"]},
    reviewing: [ReviewSchema]
    // price: {type: Number, required:[true, "Price cannot be empty"]},
}, {timestamps: true});
mongoose.model("Belt", BeltSchema);
var Belt = mongoose.model("Belt");
mongoose.model("Review", ReviewSchema);
var Review = mongoose.model("Review");

// routes
app.get("/belts", (req, res) => {
    console.log("Enter /belts for retrive all belts");
    Belt.find({})
    .then(
        data => res.json({message: true, belts: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});
app.get("/belt/:id", (req, res) => {
    console.log("Enter /belt/:id for retrive belt by id");
    Belt.findOne({_id: req.params.id})
    .then(
        data => res.json({message: true, belt: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

app.post("/belt", (req, res) =>{
    console.log("Enter POST /belt/ to CRAETE belt. req.body: ", req.body);
    Belt.create(req.body)
    .then(
        data => res.json({message: true, belt: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

//post for reviewing a movie with <:id>
app.post("/belt/:id", (req, res) => {
    console.log("Update movie with id:",req.params.id)
    console.log("Update movie with req.body:",req.body)
    Review.create(req.body, function(err, data){
        if(err){
            console.log("Erro creating review for adding ",err)
            res.json({message:false, err})
        }else{
            console.log("pushing",data,"into Movie collection")
             Belt.update({_id:req.params.id}, {$push: {reviewing:data}}, function(err){
                if(err){
                    console.log("Error in pushing data into Movie ",err)
                    res.json({message:false, err})
                }
                res.json({message:true})
            })
        }
    })
   
})

app.put("/belt/:id", (req, res) => {
    console.log("Enter PUT /beltfor UPDATE belt. req.body: ", req.body);
    Belt.update({_id: req.body._id}, req.body, {runValidators: true, context: 'query'})
    .then(
        data => res.json({message: true, belt: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

app.delete("/belt/:id", (req, res) => {
    console.log("Enter DELETE /belt/:id for delete belt by id");
    Belt.remove({_id: req.params.id})
    .then(
        data => res.json({message: true, belt: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

app.delete("/beltReview/:mvid&:_id", (req, res) => {
    console.log("delete(beltReview), req.params: ", req.params)
    Belt.update({_id:req.params.mvid}, {$pull: {reviewing: {_$in: {_id:req.params._id}}}})
    .then(
        data => {
            console.log('finding movie to delete true')
            // Review.remove({_id: req.params._id})
            // .then(
            //     data => {
            //         console.log("betreview remove true")
            //         res.json({message: true, belt: data})
            //     }
            // )
            res.json({message: true, belt: data})
            
            // .catch(
            //     error => {
            //         console.log("betreview remove error")
            //         res.json({message: false, err: error})
            //     }
            // )
        }
    )
    .catch(
        error => {
            console.log('finding movie to delete review: promise:error')
            res.json({message: false, err: error})
        }
    )
        // console.log("Enter DELETE /belt/:id for delete belt by id");
    // Review.remove({_id: req.params.mvid})
    // .then(
    //     data => res.json({message: true, belt: data})
    // )
    // .catch(
    //     error => res.json({message: false, err: error})
    // )
});

const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'));
});
 



app.listen(8000, ()=>{
    console.log("Listening on port 8000!")
});