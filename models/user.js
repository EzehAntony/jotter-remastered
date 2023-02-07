import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  username: { type: "String", required: true, unique: true },
  password: { type: "String", required: true },
});

export default models.user || model("user", userSchema);
