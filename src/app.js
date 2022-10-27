
const express = require('express');
const consign = require('consign');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();


var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname,"views"));

//Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')))

const db = require("./models/index");
const Role = db.Role;

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
 

  res.json({ message: "Welcome to JWT Login application." });
});


//app.get('/api/auth/signin', (req, res) => res.render('login'));

//app.get('/api/auth/signup', (req, res) => res.render('registrar'));

require('./routes/routes.auth')(app);
require('./routes/routes.users')(app);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


consign()
.include("models")
.then("routes")
.into(app);

 

 