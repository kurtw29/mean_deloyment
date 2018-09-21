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
mongoose.connect('mongodb://localhost/belt');
var BeltSchema = new mongoose.Schema({
    title: {type: String, required:[true, "Title must be provided"], minlength:[3, "Title must have at least 3 characters"]},
    description: {type: String, required: [true, "A description must be provided"], minlength: [3, "A description must contain at least 3 characters"], default: ""},
    // price: {type: Number, required:[true, "Price cannot be empty"]},
}, {timestamps: true});
mongoose.model("Belt", BeltSchema);
var Belt = mongoose.model("Belt");

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

const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'));
});
 



app.listen(8000, ()=>{
    console.log("Listening on port 8000!")
});