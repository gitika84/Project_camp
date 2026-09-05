import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    createdBy : {
        type : Schema.Types.ObjectID,
        ref : "User",
        required : true
    }
}, { timestamps : true })

const Project = mongoose.model("Project" , projectSchema)

export default Project