const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "no photo"
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports=mongoose.model('Post', postSchema);













// const mongoose = require('mongoose');
// const  {objectId} = mongoose.Schema.Types

// const postSchema = new mongoose.Schema({
//     title : {
//         type: String,
//         required : true
//     },
//     body : {
//         type : String,
//         required: true
//     },
//     photo : {
//         type : String,
//         default : "no photo"
//     },
//     postedBy : {
//         type: objectId,
//         ref: "User"
//     }
// })

// mongoose.model('Post', postSchema)