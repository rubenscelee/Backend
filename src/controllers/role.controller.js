const db = require("../models");
const Role = db.Role;

exports.create = async (req, res) => {
  const role = {
    id: req.body.id,
    name: req.body.name
  };

  await Role.create(role)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: 
        err.message || "Some error occurred while creating the role"
    });
  });

  Role.sync({ alter: true });
}

exports.findAll = async (req, res) => {
  await Role.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Some error occurred while showing the Roles"
      }); 
    });
};