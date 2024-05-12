const connectToMongo =require('./db');
const mongoose =require('mongoose');
const express = require('express')
const cors = require('cors');


// const upload = multer({ dest: 'uploads/' })
connectToMongo();
const app = express()
const port = 5000
mongoose.connect('mongodb://localhost:27017/iNotes')
app.use(express.json())
app.use(cors());


app.use("/api/auth",require('./routes/auth'))
app.use("/api/posts",require('./routes/posts'))
app.use("/api/note",require('./routes/note'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
