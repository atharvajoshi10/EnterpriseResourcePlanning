var host = 'http://localhost:5000';
const updateForm = document.querySelector('#edit-raw_material');
const defaultLoc = document.getElementById('defaultImg').value;

$('input[type="checkbox"]').on('change', function() {
    $('input[type="checkbox"]').not(this).prop('checked', false);
});

const update = async (Id,name,mid,description,category,quantity,measurement,unit,imgLocation=defaultLoc) => {
    try{
    const res = await axios({
        method: 'PATCH',
        url: `${host}/raw_material/api/update/${Id}`,
        data: {
            raw_material_name: name,
            raw_material_id: mid,
            description: description,
            category: category,
            quantity: quantity,
            measurement: measurement,
            unit:unit,
            raw_material_thumbnail_location: imgLocation
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'Raw Material updated successfully');
        window.setTimeout(() => {
            window.location.assign(`/raw_material/${Id}`)
        }, 1500);
    }
    }catch(err){
        $('#editRawMaterial').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const add = async (name,mid,description,category,quantity,measurement,unit,imgLocation=defaultLoc) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/raw_material/api/add`,
        data: {
            raw_material_name: name,
            raw_material_id: mid,
            description: description,
            category: category,
            quantity: quantity,
            measurement: measurement,
            unit:unit,
            raw_material_thumbnail_location: imgLocation
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'New Raw Material created successfully');
        window.setTimeout(() => {
            location.assign('/raw_material')
        }, 1500);
    }
    }catch(err){
        $('#editRawMaterial').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const uploadImage = async (data) =>{
    try{
        const res = await axios({
            method: 'POST',
            url: `${host}/raw_material/api/uploadImage`,
            data
        });
        if(res.data.status = 'success'){
            return res.data.location;
        }
    }catch(err){
        $('#editRawMaterial').modal('hide');
        showAlert('danger', err.response.data.message); 
    }
}

const updateRawMaterial = async (btn) =>{
    const name = document.getElementById('name').value;
    const mid = document.getElementById('mid').value;
    const description = document.getElementById('description').value;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if(checkboxes.length === 0){
        $('#editRawMaterial').modal('hide');
        showAlert('danger', 'Please select a category');
        return false;
    }
    const category= $('input[type="checkbox"]:checked').val();
    const quantity=document.getElementById('quantity').value;
    const measurement=document.getElementById('measurement').value;
    const e=document.getElementById('unit')
    const unit = e.options[e.selectedIndex].text;
    const Id = document.getElementById('Id').value;
    const image = document.getElementById('thumbnail');
    if(image.files.length === 0 ){ 
        if(btn === 'update'){
            update(Id,name,mid,description,category,quantity,measurement,unit);
        }else if(btn === 'saveAsNew'){
            add(name,mid,description,category,quantity,measurement,unit);
        }
    }
    else{
        const form = new FormData();
        form.append('thumbnail', document.getElementById('thumbnail').files[0])
        if(btn === 'update'){
            uploadImage(form).then(function(result) {
                update(Id,name,mid,description,category,quantity,measurement,unit,result);
            }); 
        }else if(btn === 'saveAsNew'){
            uploadImage(form).then(function(result) {
                add(name,mid,description,category,quantity,measurement,unit,result);
            }); 
        }
    }
}

if(updateForm){
    updateForm.addEventListener('submit', e =>{
        e.preventDefault();
        $('#editRawMaterial').modal('hide');
        const mid = document.getElementById('mid').value;
        const btn = this.document.activeElement.getAttribute("id");
        if(btn === 'saveAsNew'){
            const initialMid = document.getElementById('initialMid').value;
            if(mid == initialMid){
                $('#editRawMaterial').modal('hide');
                showAlert('danger', 'Assign a new Raw Material Id');
                return false;
            }
        }
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            updateRawMaterial(btn);
        });
    });
}