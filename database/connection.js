
import mongoose from "mongoose";
const connect = () => {
    

    mongoose.connect("mongodb://resume:resume@127.0.0.1:27017/resume")
        .then(() => console.log('DataBase is connected!'));
}
    export default  connect