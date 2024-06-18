
import mongoose from "mongoose"
const resume = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim:true
    },
    file: {
        type:String
    },
    city: {
        type: String,
        trim:true
    },
    state: {
        type: String,
        trim:true
    },
    country: {
        type: String,
        trim:true
    }
})

const resumes = mongoose.model("resume", resume, "resume");
export default resumes