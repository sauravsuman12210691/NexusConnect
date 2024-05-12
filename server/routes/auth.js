const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const cors = require('cors');
const getuser = require('../middleware/getuser');
const { body, validationResult } = require('express-validator')
const router = express.Router();
const User = require('../models/user');
const jwt_SECRT = "saurav123"
// app.use(cors());
// endpoint to create user http://localhost:5000/api/auth/createUser
router.post('/createUser',
   [
      body('name', 'Enter a valid name').isLength({ min: 3 }),
      body('email', 'Please enter a valid email').isEmail(),
      body('password', 'password must be attlest 8 characters').isLength({ min: 8 }),
   ]
   , async (req, res) => {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(401).json({ error: errors.array() })
      }
      try {
         const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ error: errors.array() })
      }
         let user = await User.findOne({ email: req.body.email })
         if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
         }
         const salt = await bcrypt.genSalt(10);
         var secPassword = await bcrypt.hash(req.body.password, salt)
         user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
         })
         const data = {
            user: {
               id: user.id
            }
         }
         const awthToken = jwt.sign(data, jwt_SECRT)
         // console.log(jwtdata)
         res.json({ awthToken })
         // res.json({ error: 'Please enter a unique value for email', massege: err.massege })
      } catch (err) { res.status(500).json({ "error": "Some error occurs" }) }
   });

// endpoint to Login http://localhost:5000/api/auth/login
router.post("/login",

   [

      body('email', 'Please enter a valid email').isEmail(),
      body('password', '__Password cannot be blank').exists(),
   ]
   , async (req, res) => {
      const { email, password } = req.body;
      try {
         
         var success=true;

         let user = await User.findOne({ email: email });
         if (!user) {
            success=false;
            // return res.status(400).json({ error: "Wrong  credentials!" })
         }
         const passCompare = await bcrypt.compare(password, user.password)
         if (!passCompare) { 
            success=false;
         }
            const data = {
               user: {
                  id: user.id
               }
            }
            
            const awthToken = jwt.sign(data, jwt_SECRT)
            // console.log(jwtdata)
            if(success){
               res.json({ awthToken ,success})
               
            }else{
             res.status(400).json({success, error: "Wrong  credentials!" }) 
            }

         

      } catch (err) { res.status(500).json({ "error": "Some error occurs" }) }

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ error: errors.array() })
      }

   }
)

//ROUTE 3: get user details || Login requrired

try {

   router.get('/getuser', getuser, async (req, res) => {
      let userId = req.user.id;
      let user = await User.findById(userId).select("-password")
      res.send(user);
   })
} catch (err) { res.status(500).json({ "error": "Some error occurs" }) }
module.exports = router;