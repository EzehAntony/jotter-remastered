import user from "../../../models/user";
import dbConnect from "../../../utils/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();
    const { id } = req.body;
    try {
      const oldUser = await user.findById(id);
      if (oldUser) {
        const { password, ...others } = oldUser._doc;
        res.status(200).json(others);
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
