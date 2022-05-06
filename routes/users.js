const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");

//Note that express validate is middle ware like

router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password is Required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // res.send("req.body");
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: { msg: "User already exists" } });
      }
      //////this part for geting the image avatar from the email used
      /// the below s referce to size
      /// the below r means public
      /// the below d means defualt and mm means when there is no image gives empty avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        password,
        avatar,
      });
      //this part for password bcrypting gensalt
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);

      await user.save();
      res.send("User Registed succefully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
