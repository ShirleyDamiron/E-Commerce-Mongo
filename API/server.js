const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const fs = require("fs");
const {verifyToken} = require("./Auth/auth")
const PORT = process.env.PORT || 3001
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
app.use(proxy("/api/*", { target: `http://localhost:${PORT}/` }));

// disables certain headers so they can be private

app.use(helmet());

// app.use(verifyToken)

app.get("api/users", getUsers);

app.get("api/users/userFilter/:id", getUserById);

app.post("api/newUser", newUsers);

app.put("api/updateUser" , updateUser)

app.delete("api/deleteUser/:user_id" , deleteUser)

app.post("api/authenticateUser", authenticateUser)

app.post("api/authentication", authenticate)

app.get("api/signOut", verifyToken, signOut)

app.get("api/checkToken", verifyToken, function(req, res){
  res.json({status: 200});
})

app.listen(PORT, () => {
  console.log("Listening on port 3001");
});
