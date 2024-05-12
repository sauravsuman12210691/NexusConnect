const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getuser =require('../middleware/getuser');

const { body, validationResult } = require('express-validator')
const router = express.Router();
const Usernotes = require('../models/Notes');
// 1. endpoint to fetch user notes http://localhost:5000/api/note/getnotes
router.get('/getnotes',getuser,async(req,res)=>{
try{
    const Notes = await  Usernotes.find({user: req.user.id});
console.log(Notes)
res.json(Notes)
}
    catch (err) { res.status(500).json({ "error": "Some error occurs"}) }

})

// 2. endpoint to fetch user notes http://localhost:5000/api/note/addnotes
router.post('/addnotes',getuser,
    [

        body('title', 'min 3 required').isLength({ min: 3 }),
        body('discription', 'cannot be blank').exists(),
        body('tag', ' cannot be blank').exists(),
     ]
, async(req,res)=>{
    const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ error: errors.array() })
      }
    const { title, discription,tag } = req.body;
    const note =new Usernotes({
        title,discription,tag,user:req.user.id
    })
    const saveNotes = await note.save()
    res.json(saveNotes)

})
//upload image 

module.exports = router;