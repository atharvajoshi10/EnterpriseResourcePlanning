//Import Statement to load the models
let FinalProduct = require('../models/final_product.model');

exports.getFinalProducts = async (req,res) => {
    try{
        const finalproduct = await FinalProduct.find();
        res.render('final_product',{
            title: 'Final Product',
            finalproduct
        });
    }catch(e){
        res.status(500).send('Error:' + e);
    }
};