let {signup, signin} = require("../controllers/yarncontro");
const { checkUser } = require("../Middleweaars/middleware");

let router = require("express").Router();

router.post("/" ,checkUser )
router.post("/signup",signup);
router.post("/signin",signin);

module.exports = router;