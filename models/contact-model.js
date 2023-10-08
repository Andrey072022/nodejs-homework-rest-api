import { Schema, model } from "mongoose";

import { handlSaveError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        require: [true, "Set name for contact"],
    },
   
    email: {
        type: String,
        require: [true, "Set email for contact"],
    },
    phone: {
        type: String,
        require: [true, "Set phone for contact"],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
}, {versionKey: false, timestamps:true});

contactSchema.post("save", handlSaveError)

 contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);

 contactSchema.post("findOneAndUpdate", handlSaveError);

const Contact = model("contact", contactSchema);

export default Contact;