import note from "@/models/note";
import dbConnect from "@/utils/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();
    const { title, body, userId } = req.body;
    try {
      const newNote = await note.create({
        title: title,
        body: body,
        userId: userId,
      });

      res.status(200).json(newNote);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("invalid request method");
  }
};

export default handler;
