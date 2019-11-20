const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const fs = require("fs");
const {verifyToken} = require("./Auth/auth")
const {
  getUsers,
  getUserById,
  newUsers,
  updateUser,
  deleteUser,
  authenticate,
  authenticateUser,
  signOut
} = require("./routes.js");

const accessLogStream = fs.createWriteStream("morgan.log", { flags: "a" });

const MONGODB_URI = process.env.NODE_ENV ? process.env.PROD_MONGO_URI : 'mongodb://localhost/Project5DB' 
console.log(MONGODB_URI)

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(bodyParser())
app.use(cookieParser())
app.use(morgan("combined", { stream: accessLogStream }));

// disables certain headers so they can be private

app.use(helmet());

// app.use(verifyToken)

app.get("/users", getUsers);

app.get("/users/userFilter/:id", getUserById);

app.post("/newUser", newUsers);

app.put("/updateUser" , updateUser)

app.delete("/deleteUser/:user_id" , deleteUser)

app.post("/authenticateUser", authenticateUser)

app.post("/authentication", authenticate)

app.get("/signOut", verifyToken, signOut)

app.get("/checkToken", verifyToken, function(req, res){
  res.json({status: 200});
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("Listening on port 3001");
});
