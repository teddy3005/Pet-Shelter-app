var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment");

var app = express();

app.use(express.static( __dirname + '/Client/dist' ));  //connecting the angualar app in express

// app.use(bodyParser.urlencoded({extended: true}));
// configure body-parser
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/pets");
mongoose.Promise = global.Promise;

var PetSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name needs to be at least 3 characters"], minlength: [3, "Name needs to be at least 3 characters"], unique: [true, "Name Already Exists!"]},
    type: { type: String, required: [true, "Type needs to be at least 3 characters"], minlength: [3, "Type needs to be at least 3 characters"] },
    desc: { type: String, required: [true, "Description needs to be at least 3 characters"], minlength: [3, "Description needs to be at least 3 characters"] },
    skill1: { type: String, default: "" },
    skill2: { type: String, default: "" },
    skill3: { type: String, default: "" },
    like: {type: Number, default: 0}
},
    { timestamps: true });

mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet')


app.post("/create", function(req, res){
	var pet = new Pet();
    pet.name = req.body.name;
    pet.type = req.body.type;
	pet.desc = req.body.desc;
	pet.skill1 = req.body.skill1;
    pet.skill2 = req.body.skill2;
    pet.skill3 = req.body.skill3;
    pet.like = 0
	
  	pet.save(function(err){
		if(err){
            console.log("ERROR: ", pet.errors);
            res.json({message:"Error", error: pet.errors});
		}
		else{
			console.log('You successfully created pet.' );
			res.json({message: "Success", data : pet});
		}
	})
})



app.put('/pets/edit/:id', function(req, res){
	Pet.findOne({ _id: req.params.id}, function (err, pet){
		if(pet){
			pet.name = req.body.name;
            pet.type = req.body.type;
            pet.desc = req.body.desc;
            pet.skill1 = req.body.skill1;
            pet.skill2 = req.body.skill2;
            pet.skill3 = req.body.skill3;
			pet.like = req.body.like
		pet.save(function(err){
			if(err){
				res.json({ message: "Error", error: pet.errors })
			}
			else{
				res.json({ message: "success!!!!!!!", data: pet})
			
			}
		})
		}
	})
})




// RETRIEVE ALL pets
app.get('/pets', function(req, res){
	Pet.find({}, function(err, pets){
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({data:pets})
		}
	})
})

app.delete("/delete/:id", function(req, res){
	Pet.remove({_id: req.params.id}, function(err){
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({message: "Success"})
		}
	});
})

app.put('/pets/up/:id', function(req,res){
	console.log("hello*****",req.body._id);
	Pet.findOne({_id:req.params.id}, function(err, pet){
		console.log("the up works*****",req.body._id);
		
			pet.like += 1 
		pet.save(function (err){
			if(err) {
				res.json({message: "Error", error:pet.errors})
			}
			else{
				res.json({ message: "success"})
			}
		})
	})
})

app.get('/pets/:id',function(req, res){
	// console.log("pooooop")
	Pet.findOne({_id:req.params.id}, function(err, pet){
		if (err){
			res.json({ message: "Error", error: err})
		}
		else{
			res.json({ message: "Success", data:pet})
		}
	})
})


app.delete('/pets/remove/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Pet.remove({ _id: req.params.id }, function (err) {


        // if there is an error console.log that something went wrong!
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })

        }
        else { // else console.log that we did well and then redirect to the root route

            console.log('successfully removed a pet!');
            res.json({ message: "Success" })
        }
    })
})








app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./Client/dist/index.html"))
});

var server = app.listen(8000, function(){
    console.log("listening on port 8000");
    
});


