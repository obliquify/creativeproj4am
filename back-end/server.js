const express = require('express');
const bodyParser = require("body-parser");
const moment = require('moment'); 
const path = require('path'); 
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname,"../front-end/dist")))

// connect to the database

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  description: String, 
  path: String,
});

const thoughtSchema = new mongoose.Schema({
  name: String,
  thought: String, 
  date: String, 
});

// moment().format('MMMM Do YYYY, h:mm a'),




// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

const Thought = mongoose.model('Thought', thoughtSchema); 

mongoose.connect('mongodb+srv://kallie:cherry@cluster0.qbkvj.mongodb.net/creativeProject4?retryWrites=true&w=majority', {
  useNewUrlParser: true,
   useUnifiedTopology: true 
});

// app.get('/hi', (req, res) => {
//   console.log('hi')
//   res.json({msg:"this is from backend"})
// })

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});



app.post('/api/items', async (req, res) => {
  // console.log(req.body.path);
  // return; 
  // console.log("help");
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
    
  });

  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  console.log("delete!");
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  console.log("put!");
  await Item.findOne({_id: req.params.id},  (err, item) => {
    try {
      if (err) {
        console.log(err);
        return;
      } else {
        item.title = req.body.title;
        item.description = req.body.description;
        item.save(item);
        res.send(item);
      }
    } catch(error) {
      console.log(err)
    }
  });

});

app.get("/api/deleteAll/:password", (req , res) => {
    if(req.params.password === "cherry"){
    Thought.remove((err , haha) => {
      if(err){
        console.log(err)
      }else{
        console.log(haha); 
        res.status(200).json({msg:"Deleted all stuff"})
      }
    })
  }
  else{
    res.status(402).json({msg:"Access denied"})
  }
})


app.post('/api/thoughts',  (req, res) => {
 console.log(moment().format('MMMM Do YYYY, h:mm a'));

  const thought = new Thought({
    name: req.body.name, 
    thought: req.body.thought,
    date: moment().format('MMMM Do YYYY, h:mm a'),
  }); 
  console.log(thought); 
 
    thought.save((err, thought) => {
    if(err){
     res.status(500).json({msg: "Server err"});
     return; 
    }else{
      console.log("hi")
     res.status(200).json({thought});
     return; 
    }
  }); 

})

app.get('/api/thoughts', (req, res) => {
  Thought.find((err, thoughts)=> {
    if(err){
      res.status(500).json({msg:"Server error"}); 
    }else{
      res.status(200).json(thoughts); 
    }
  })
})

app.delete('/api/thoughts/:id', async (req, res) => {
  console.log("delete!");
  try {
    await Thought.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


 
app.listen(5000, () => console.log('Server listening on port 5000!'));
