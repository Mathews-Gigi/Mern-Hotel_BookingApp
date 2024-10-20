// Users routes
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    // check a user exixt with email , by cheking the user model and chech that the email from request match with email in db
    let user = await User.findOne({
      email: req.body.email,
    });
    //if we have a user
    // 400 for bad request when user exixt in db
    if (user) {
      return res.status(400).json({ message: "User already exixt " });
    }
    // create new user , 57.55
    user = new User(req.body);
    await user.save();

    // jwt token creation
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        // token exprire in one day ! , here additional option is placed
        expiresIn: "1d",
      }
    );
    // create a cookie named auth_token wirh http request only
    res.cookie("auth_token", token, {
      // retuen token in coookie
      // cookiee charatrstics
      // only http request allowded , https is used  whrn in production , expire time in mil sec
      httpOnly: true,
      //return true when in production else always false;
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    // resturn sucess response
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
});

export default router;
