var host = 'http://localhost:5000';
const updateForm = document.querySelector('.form');
const defaultLoc = document.getElementById('defaultImg').value;

const update = async (name,iid,description,Id,imgLocation=defaultLoc) => {
    try{
    const res = await axios({
        method: 'PATCH',
        url: `${host}/items/api/update/${Id}`,
        data: {
            item_name: name,
            item_id: iid,
            description: description,
            items_thumbnail_location: imgLocation
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'Item updated successfully');
        window.setTimeout(() => {
            location.assign(`/items/${Id}`)
        }, 1500);
    }
    }catch(err){
        $('#editItem').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const add = async (name,iid,description,imgLocation=defaultLoc) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/items/api/add`,
        data: {
            item_name: name,
            item_id: iid,
            description: description,
            ite_thumbnail_location: imgLocation
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'New Item created successfully');
        window.setTimeout(() => {
            location.assign('/items')
        }, 1500);
    }
    }catch(err){
        $('#editItem').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const uploadImage = async (data) =>{
    try{
        const res = await axios({
            method: 'POST',
            url: `${host}/items/api/uploadImage`,
            data
        });
        if(res.data.status = 'success'){
            return res.data.location;
        }
    }catch(err){
        $('#editItem').modal('hide');
        showAlert('danger', err.response.data.message);
    }
}

const updateItem = async (btn) =>{
    const name = document.getElementById('name').value;
    const iid = document.getElementById('iid').value;
    const description = document.getElementById('description').value;
    const Id = document.getElementById('Id').value;
    const image = document.getElementById('thumbnail');
    if(btn === 'saveAsNew'){
        const initialid = document.getElementById('initialid').value;
        if(iid == initialid){
            $('#editItem').modal('hide');
            showAlert('danger', 'Assign a new Item Id');
            return false;
        }
    }
    if(image.files.length === 0 ){ 
        if(btn === 'update'){
            update(name,iid,description,Id);
        }else if(btn === 'saveAsNew'){
            add(name,iid,description);
        }
    }else{
        const form = new FormData();
        form.append('thumbnail', document.getElementById('thumbnail').files[0])
        if(btn === 'update'){
            uploadImage(form).then(function(result) {
                update(name,iid,description,Id,result);
            }); 
        }else if(btn === 'saveAsNew'){
            uploadImage(form).then(function(result) {
                add(name,iid,description,result);
            }); 
        }
    }
}

if(updateForm){
    updateForm.addEventListener('submit', e =>{
        e.preventDefault();
        $('#editItem').modal('hide');
        const btn = this.document.activeElement.getAttribute("id");
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            updateItem(btn);
        });
    });
}