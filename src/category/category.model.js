import {Schema , model} from "mongoose"

const categorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    Publication:[{
        type: Schema.Types.ObjectId,
        ref: "Publication",
        default: []
    }],
    status:{
        type: Boolean,
        default: true
    }
});

categorySchema.methods.toJSON = function(){
    const { __v, status, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
};


export default model("Category", categorySchema);