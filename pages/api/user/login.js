import bcryptjs from "bcryptjs";
import user from "../../../models/user";
import dbConnect from "../../../utils/mongodb";

const handler = async (req, res) => {
  await dbConnect();
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      let oldUser;
      oldUser = await user.findOne({ username: username });
      if (oldUser) {
        const verify = await bcryptjs.compare(password, oldUser.password);
        if (verify) {
          const { password, ...others } = oldUser._doc;
          res.status(200).json(others);
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
