const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
//const Role = db.Role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  // Save User to Database
  await User.create({
    //username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Some error occurred while creating the user"
    });
  }); 
  await User.sync(); 
  /*
  .then(user => {
    if(req.body.roles){
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      })
      .then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully!"});
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!"});
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message});
  });
 */
}

exports.signin = async (req, res) => {
  await User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if(!user) {
      return res.status(404).send({ message: "User Not found."});
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    var authorities = [];

  }
)}