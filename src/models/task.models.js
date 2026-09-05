import mongoose, { Schema } from "mongoose";
import { TaskStatusEnum , AvaliableTaskStatus } from "../utils/constant.js"

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        
    },
    project : {
        type : Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    assignedTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    assignedBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        enum : AvaliableTaskStatus,
        default : TaskStatusEnum.TODO
    },
    attachment : {
        type : [{
            url : String,
            MimeType : String,
            size : Number
        }],
        default : []
    }
}, { timestamps : true })

const Task = mongoose.model("Task" , taskSchema)

export default Task