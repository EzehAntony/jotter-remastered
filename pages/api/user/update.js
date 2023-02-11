import user from "../../../models/user";
import dbConnect from "../../../utils/mongodb";
import bcryptjs from "bcryptjs";
const handler = async (req, res) => {
  if (req.method === "PUT") {
    await dbConnect();
    const { username, password, newPassword, id } = req.body;
    try {
      if (newPassword.length > 5 && newPassword !== "") {
        const salt = bcryptjs.genSalt(10);
        const hashpassword = bcryptjs.hash(newPassword, salt);
        const oldUser = await user.findById(id);
        const verified = bcryptjs.compare(password, oldUser.password);
        if (verified) {
          await oldUser.updateOne({
            $set: {
              password: hashpassword,
            },
          });
          res.status(200).json("password updated");
        } else {
          res.status(500).json("Unable to verify user, password is incorrect");
        }
      } else {
        res
          .status(500)
          .json(
            "Your password is either empty or not long enough. Minimum of 5 characters are required"
          );
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("invalid request method");
  }
};

export default handler;
