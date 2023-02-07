import user from "@/models/user";
import dbConnect from "@/utils/mongodb";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    await dbConnect();
    const { id, password } = req.body;

    try {
      const oldUser = await user.findById(id);
      if (oldUser) {
        const verify = bcryptjs.compare(password, oldUser.password);
        if (verify) {
          await oldUser.deleteOne();
          res.status(200).json("Account has been deleted successfully");
        } else {
          res
            .status(500)
            .json(
              "unable to verify your account because of the password entered is incorrect"
            );
        }
      } else {
        res.status(500).json("No user with the provided ID");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("invalid request method");
  }
};

export default handler;
