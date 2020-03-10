var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next){
    res.render("Server is now running", {title : "Site under construction"});
});
 module.exports = router;