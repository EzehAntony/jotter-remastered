import note from "@/models/note";
import dbConnect from "@/utils/mongodb";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { title, body, id } = req.body;
    await dbConnect();
    try {
      const oldNote = await note.findById(id);
      if (oldNote) {
        await oldNote.updateOne({
          $set: {
            title: title,
            body: body,
          },
        });
        res.status(200).json("Updated");
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
