//Import Statements to load the models
let Raw_material = require('../models/raw_material.model');

exports.getRawMaterials = async (req,res) => {
    try{
        const raw_materials = await Raw_material.find();
        res.render('raw_materialList',{
            title: 'Raw Materials',
            raw_materials
        });
    }catch(e){
        res.status(500).send('Error:' + e);
    }
};

exports.getRawMaterialById = async (req,res) =>{
    try{
        const raw_material = await Raw_material.findById(req.params.id)
        if(!raw_material){
            res.status(404).send('Error: Invalid ID'); 
        }
        res.render('raw_material',{
            title: 'Raw Material | ' + raw_material.raw_material_name,
            raw_material
        });
    }catch(e){
        res.status(500).send('Error:' + e);
    }
};