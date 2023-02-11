import user from "../../../models/user";
import dbConnect from "../../..//utils/mongodb";
import bcryptjs from "bcryptjs";
import { isObjectIdOrHexString } from "mongoose";
const handler = async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();
    const { username, password } = req.body;
    try {
      const newUser = await user.findOne({ username: username });
      if (newUser) {
        res.status(500).json("User already exists");
      } else {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const newuser = await user.create({
          username: username,
          password: hashPassword,
        });
        //const { password, ...other } = newuser;
        res.status(200).json(newuser);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("invalid request method");
  }
};

export default handler;
