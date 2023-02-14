import note from "@/models/note";
import dbConnect from "@/utils/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();
    const { id } = req.body;
    try {
      const oldNote = await note.findById(id);
      if (oldNote) {
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
