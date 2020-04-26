//Describes model for the items/components

//Required import, Do not change
const Schema = mongoose.Schema;

//Schema Definition
const itemSchema = new Schema({
    item_name:{
        type: String,
        required: true
    },
    description: String,
    drawing_number:{
        type: String,
        required: true
    },
    drawing_location: String,
    process_list_overide: Boolean,
    process_list:[String]
},{
    timestamps:true,
});


//Necesarry Export statement, Do not Change
const Item = mongoose.model('Item', itemSchema);

export default Item;