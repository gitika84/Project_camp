import mongoose from "mongoose";
import { UserRolesEnum , AvaliableUserRoles } from "../utils/constant.js"

const ProjectMemberSchema = new mongoose.Schema({
    user : {
        type : Schema.Types.ObjectID,
        ref : "User",
        required : true,
        trim : true
    },
    project : {
        type : Schema.Types.ObjectID,
        ref : "Project",
        required : true,
        trim : true
    },
    role : {
        type : String,
        enum : AvaliableUserRoles,
        default : UserRolesEnum.MEMBER
    },
}, { timestamps : true })


const ProjectMember = mongoose.model("ProjectMember" , ProjectMemberSchema)

export default ProjectMember