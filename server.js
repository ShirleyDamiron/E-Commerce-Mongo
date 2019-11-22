const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const path = require('path');
const PORT = process.env.PORT || 3001
const routes = require("./routes/router")
const MONGODB_URI = process.env.NODE_ENV === "production" ? process.env.PROD_MONGO_URI : 'mongodb://localhost/Project5DB' 

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(express.static("../React-Project/build"));
app.use(bodyParser())
app.use(cookieParser())
app.use("/api", routes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("React-Project/build"));
} 

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../React-Project/build/index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on port 3001");
});
