import user from "../../../models/user";
import dbConnect from "../../../utils/mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    await dbConnect();
    try {
      const allUsers = await user.find().select("username");
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("invalid request method");
  }
};

export default handler;
