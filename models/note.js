import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
  title: { type: "String", required: true, unique: true },
  body: { type: "String", required: false },
  userId: { type: "String" },
});

export default models.note || model("note", noteSchema);
