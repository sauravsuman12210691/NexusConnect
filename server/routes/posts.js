const multer = require('multer')
const getuser = require('../middleware/getuser');
const Userpost = require('../models/Posts');

// const connectToMongo =require('./db');
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const router = express.Router();
router.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/images/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname) //Appending extension
  }
})

const upload = multer({ storage: storage })
router.post('/upload-image', getuser, upload.single('image'), async (req, res) => {

  //fetching discription
  const { description } = req.body;

  // Perform additional validation if needed

  const imgName = req.file.filename;
  console.log(req.user.id)
  await Userpost.create({ imgName, discription: description, user: req.user.id });
  //  console.log(discription)


  console.log(req.body)
  res.send("Uploaded!!")
})


// get Post
router.get('/getPost', getuser, async (req, res) => {
  try {

    const data = await Userpost.find({ user: req.user.id });
    // console.log(post)
    res.json({ data: data })

  }
  catch (err) { res.status(500).json({ "error": "Some error occurs" }) }

})

module.exports = router;