import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// user model represent user document in mongo db database ;

// declare user type in ts
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// defieing the schema of user , properties witth mongoose
// we pass an object inside the schema , id not needed
// moongose schema is in capital
const userSchema = new mongoose.Schema({
  emil: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// middleware for mongodb , check the password , if changed pasword dcript it and hash it then call a next function ..next anything .
// now user can create a token
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

// create a model from schema from above
//specifiy the name of doc ("User",userSchema)
const User = mongoose.model<UserType>("User", userSchema);

export default User;
