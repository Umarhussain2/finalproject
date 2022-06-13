let mongoose = require("mongoose");

let bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.signin = async function (email, password) {
  const user = await this.findOne( {email} );
  if (user) {
    const yarn = await bcrypt.compare(password, user.password);
    if (yarn) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
