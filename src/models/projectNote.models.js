import mongoose from "mongoose";


const ProjectNoteSchema = new mongoose.Schema({
    createdBy : {
        type : Schema.Types.ObjectID,
        ref : "User",
        required : true
    },
    project : {
        type : Schema.Types.ObjectID,
        ref : "Project",
        required : true
    },
    content : {
        type : String,
        trim : true,
        required : true
    }
}, { timestamps : true } )


const ProjectNote = mongoose.model("ProjectNote" , ProjectNoteSchema)

export default ProjectNote