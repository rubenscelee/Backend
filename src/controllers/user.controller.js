


exports.allAccess = (req, res) => {
  res.status(200).render("../views/public.hbs");
};

exports.userBoard = (req, res) => {
  res.status(200).send("../views/user.hbs");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("../views/admin.hbs");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("../views/mod.hbs");
};