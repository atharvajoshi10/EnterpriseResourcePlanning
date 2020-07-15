const createRawMaterialForm = document.getElementById('create-material-form');

let $createCategoryCheckbox = $('#create-material-category input[type="checkbox"]');
$createCategoryCheckbox.on('change', function() {
    $createCategoryCheckbox.not(this).prop('checked', false);
});

const createRawMaterialApi = async (material_name,material_id,material_description,material_category,material_quantity,material_measurement,material_unit,material_imgLocation=undefined) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/raw_material/api/create`,
        data: {
            raw_material_name: material_name,
            raw_material_id: material_id,
            description: material_description,
            category: material_category,
            quantity: material_quantity,
            measurement: material_measurement,
            unit:material_unit,
            raw_material_thumbnail_location: material_imgLocation
        },
    });
    if(res.data.status = 'success'){
        $('#create-material-modal').modal('hide');
        showAlert('success', 'New Raw Material created successfully');
        window.setTimeout(() => {
            location.assign('/raw_material')
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message, true);
    }
};

if(createRawMaterialForm){
    createRawMaterialForm.addEventListener('submit', e =>{
        e.preventDefault();
        const createRawMaterialName = document.getElementById('create-material-name').value;
        const createRawMaterialId = document.getElementById('create-material-id').value;
        const createRawMaterialDescription = document.getElementById('create-material-description').value;
        const CategoryCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        if(CategoryCheckboxes.length === 0){
            showAlert('danger', 'Please select a category',true);
            return false;
        }
        const createRawMaterialCategory= $('input[type="checkbox"]:checked').val();
        const createRawMaterialQuantity=document.getElementById('create-material-quantity').value;
        const createRawMaterialMeasurement=document.getElementById('create-material-measurement').value;
        const el=document.getElementById('create-material-unit')
        const createRawMaterialUnit = el.options[el.selectedIndex].text;
        const createRawMaterialImage = document.getElementById('create-material-thumbnail');
        if(createRawMaterialImage.files.length === 0 ){ 
            createRawMaterialApi(createRawMaterialName,createRawMaterialId,createRawMaterialDescription,createRawMaterialCategory,createRawMaterialQuantity,createRawMaterialMeasurement,createRawMaterialUnit)
        }else{
            const url = 'raw_material/api/uploadImage'
            const form = new FormData();
            form.append('thumbnail', createRawMaterialImage.files[0]);
            uploadImageApi(form,url).then(function(result) {
                createRawMaterialApi(createRawMaterialName,createRawMaterialId,createRawMaterialDescription,createRawMaterialCategory,createRawMaterialQuantity,createRawMaterialMeasurement,createRawMaterialUnit,result)
            }); 
        }
    });
}