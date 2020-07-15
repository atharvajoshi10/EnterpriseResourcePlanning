const updateRawMaterialForm = document.getElementById('update-material-form');
let material_DefaultLoc;

let $updateCategoryCheckbox = $('#update-material-category input[type="checkbox"]');
$updateCategoryCheckbox.on('change', function() {
    $updateCategoryCheckbox.not(this).prop('checked', false);
});

const updateRawMaterialApi = async (RawMaterialId,material_name,material_id,material_description,material_category,material_quantity,material_measurement,material_unit,material_imgLocation=material_DefaultLoc) => {
    try{
    const res = await axios({
        method: 'PATCH',
        url: `${host}/raw_material/api/update/${RawMaterialId}`,
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
        $('#update-material-modal').modal('hide');
        showAlert('success', 'Raw Material updated successfully');
        window.setTimeout(() => {
            window.location.assign(`/raw_material/${RawMaterialId}`)
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message,true);
    }
};


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
        $('#update-material-modal').modal('hide');
        showAlert('success', 'New Raw Material updated successfully');
        window.setTimeout(() => {
            location.assign('/raw_material')
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message, true);
    }
};


const updateRawMaterialMiddleware = async (updateType) =>{
    const updateRawMaterialName = document.getElementById('update-material-name').value;
    const updateRawMaterialId = document.getElementById('update-material-id').value;
    const updateRawMaterialDescription = document.getElementById('update-material-description').value;
    const CategoryCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const updateRawMaterialCategory= $('input[type="checkbox"]:checked').val();
    const updateRawMaterialQuantity=document.getElementById('update-material-quantity').value;
    const updateRawMaterialMeasurement=document.getElementById('update-material-measurement').value;
    const el=document.getElementById('update-material-unit')
    const updateRawMaterialUnit = el.options[el.selectedIndex].text;
    const RawMaterialId = document.getElementById('material-Id').value;
    const updateRawMaterialImage = document.getElementById('update-material-thumbnail');
    const url = 'raw_material/api/uploadImage'
    if(updateType === 'saveAsNew-material-submitBtn'){
        const initialMaterialId = document.getElementById('update-initial-materialId').value;
        if(updateRawMaterialId == initialMaterialId){
            showAlert('danger', 'Assign a new Raw Material Id');
            return false;
        }
    }
    if(CategoryCheckboxes.length === 0){
        showAlert('danger', 'Please select a category',true);
        return false;
    }
    if(updateRawMaterialImage.files.length === 0 ){ 
        if(updateType === 'update-material-submitBtn'){
            updateRawMaterialApi(RawMaterialId,updateRawMaterialName,updateRawMaterialId,updateRawMaterialDescription,updateRawMaterialCategory,updateRawMaterialQuantity,updateRawMaterialMeasurement,updateRawMaterialUnit);
        }else if(updateType === 'saveAsNew-material-submitBtn'){
            createRawMaterialApi(updateRawMaterialName,updateRawMaterialId,updateRawMaterialDescription,updateRawMaterialCategory,updateRawMaterialQuantity,updateRawMaterialMeasurement,updateRawMaterialUnit);
        }
    }
    else{
        const form = new FormData();
        form.append('thumbnail', updateRawMaterialImage.files[0])
        if(updateType === 'update-material-submitBtn'){
            uploadImageApi(form,url).then(function(result) {
                updateRawMaterialApi(RawMaterialId,updateRawMaterialName,updateRawMaterialId,updateRawMaterialDescription,updateRawMaterialCategory,updateRawMaterialQuantity,updateRawMaterialMeasurement,updateRawMaterialUnit,result);
            }); 
        }else if(updateType === 'saveAsNew-material-submitBtn'){
            uploadImageApi(form,url).then(function(result) {
                createRawMaterialApi(updateRawMaterialName,updateRawMaterialId,updateRawMaterialDescription,updateRawMaterialCategory,updateRawMaterialQuantity,updateRawMaterialMeasurement,updateRawMaterialUnit,result);
            }); 
        }
    }
}

if(updateRawMaterialForm){
    updateRawMaterialForm.addEventListener('submit', e =>{
        e.preventDefault();
        const updateType = this.document.activeElement.getAttribute("id");
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            updateRawMaterialMiddleware(updateType);
        });
    });
}

const setUpdateMaterialForm = (material) => {
    document.getElementById('update-material-id').value = material.raw_material_id;
    document.getElementById('update-material-description').value = material.description;
    document.getElementById('update-material-name').value = material.raw_material_name;
    document.getElementById('update-material-quantity').value = material.quantity;
    document.getElementById('update-material-measurement').value = material.measurement;
    document.getElementById('update-initial-materialId').value= material.raw_material_id;
    document.getElementById('update-material-defaultImgLoc').value = material.raw_material_thumbnail_location;
    material_DefaultLoc = document.getElementById('update-material-defaultImgLoc').value;
    $(`#update-material-unit option[value=${material.unit}]`).attr("selected", "selected");
    $(`#update-material-category input[value=${material.category}]`).prop('checked', true);
}