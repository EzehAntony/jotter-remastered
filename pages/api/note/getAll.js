import note from "@/models/note";
import dbConnect from "@/utils/mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    await dbConnect();
    const { userId } = req.body;
    try {
      const notes = await note.find({ userId: userId });
      if (notes) {
        res.status(200).json(oldNote);
      } else {
        res.status(500).json("No note with the provided ID");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("invalid request method");
  }
};

export default handler;
