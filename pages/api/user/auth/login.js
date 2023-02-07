import bcryptjs from "bcryptjs";
import user from "@/models/user";
import dbConnect from "@/utils/mongodb";

const handler = async (req, res) => {
  await dbConnect();
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const oldUser = await user.findOne({ username: username });
      if (oldUser) {
        const verify = bcryptjs.compare(password, oldUser.password);
        if (verify) {
          res.status(200).json("Verified and Logged in, but without a cookie");
        } else {
          res.status(500).json("Incorrect password, try again!");
        }
      } else {
        res.status(500).json("No user with that username");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(500)
      .json(`Invalid  ${req.method} request method for a POST request`);
  }
};

export default handler;
