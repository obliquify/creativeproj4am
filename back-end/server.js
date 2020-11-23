const express = require('express');
const bodyParser = require("body-parser");

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

// connect to the database

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  description: String, 
  path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
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
  console.log("help");
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


//   if(err) {
//     console.log(err);
//     return;
//   } else {
//     item.title  = req.body.title,
//     // item.path = req.body.path,
//     item.save(item),
//     res.send(item),
//   }
// } catch(error) {
//   console.log(err)
// } 

   

});

app.listen(3000, () => console.log('Server listening on port 3000!'));
