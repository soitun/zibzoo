var vendorHelpers = require('./../../db/vendor/vendorHelpers.js');

module.exports = {
  // TODO: Add password hashing
  signUp: function (req, res) {
    var vendor = {
      name: req.body.username,
      password: req.body.password
    };
    vendorHelpers.postVendors(vendor)
      .then(function (result) {
        res.status(201).send(result);
      })
      .catch(function (error) {
        res.status(401).send(error);
      });
  },

  signIn: function (req, res) {
    var vendor = {
      username: req.body.username
    };
    vendorHelpers.getVendors(vendor)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(404).send(error);
      });
  },

  retrieveVendor: function (req, res) {
    var vendor = req.query;
    vendorHelpers.getVendors(vendor)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(404).send(error);
      });
  }

};
