const process_updateForm = document.getElementById('editProcess');
const process_defaultLoc = document.getElementById('process-defaultImg').value;
const itemId = document.getElementById('Id').value;
const updateProcessApi = async (name,pid,description,workerId,machineId,Id,imgLocation=defaultLoc) => {
    try{
    const res = await axios({
        method: 'PATCH',
        url: `${host}/process/api/update/${Id}`,
        data: {
            process_name: name,
            process_id: pid,
            description: description,
            worker_id: workerId,
            machine_id: machineId,
            process_thumbnail_location: imgLocation
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'Process updated successfully');
        window.setTimeout(() => {
            location.assign(`/items/${itemId}`)
        }, 1500);
    }
    }catch(err){
        $('#editProcess').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const addProcessApi = async (name,pid,description,workerId,machineId,Id,imgLocation=defaultLoc) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/process/api/add`,
        data: {
            process_name: name,
            process_id: pid,
            description: description,
            worker_id: workerId,
            machine_id: machineId,
            process_thumbnail_location: imgLocation
        },
    });
    if(res.data.status = 'success'){
        editProcessApi(Id,res.data.id);
    }
    }catch(err){
        $('#editProcess').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const editProcessApi = async(oldId,newId) => {
    console.log(oldId,newId);
    try{
        const res = await axios({
            method: 'PATCH',
            url: `${host}/items/api/process/update/${itemId}`,
            data: {
                oldId,
                newId
            },
        });
        if(res.data.status = 'success'){
            showAlert('success', 'Process updated successfully');
            window.setTimeout(() => {
                location.assign(`/items/${itemId}`)
            }, 1500);
        }
    }catch(err){
        $('#editProcess').modal('hide');
        showAlert('danger', err.response.data.message);
    }
}

const uploadImageProcess = async (data) =>{
    try{
        const res = await axios({
            method: 'POST',
            url: `${host}/process/api/uploadImage`,
            data
        });
        if(res.data.status = 'success'){
            return res.data.location;
        }
    }catch(err){
        $('#editProcess').modal('hide');
        showAlert('danger', err.response.data.message);
    }
}

const updateProcess = async (btn) =>{
    const process_name = document.getElementById('process-name').value;
    const process_id = document.getElementById('process-id').value;
    const process_description = document.getElementById('process-description').value;
    const process_workerId = document.getElementById('process-workerId').value;
    const process_machineId = document.getElementById('process-machineId').value;
    const process_Id = document.getElementById('process-Id').value;
    const process_image = document.getElementById('process-thumbnail');
    if(btn === 'saveAsNew'){
        const initialPid = document.getElementById('initial-processId').value;
        if(process_id == initialPid){
            $('#editProcess').modal('hide');
            showAlert('danger', 'Assign a new Process Id');
            return false;
        }
    }
    if(process_image.files.length === 0 ){ 
        if(btn === 'process-update'){
            updateProcessApi(process_name,process_id,process_description,process_workerId,process_machineId,process_Id);
        }else if(btn === 'process-saveAsNew'){
            addProcessApi(process_name,process_id,process_description,process_workerId,process_machineId,process_Id);
        }
    }else{
        const form = new FormData();
        form.append('thumbnail', document.getElementById('thumbnail').files[0])
        if(btn === 'update'){
            uploadImageProcess(form).then(function(result) {
                updateProcessApi(process_name,process_id,process_description,process_workerId,process_machineId,process_Id,result);
            }); 
        }else if(btn === 'process-saveAsNew'){
            uploadImageProcess(form).then(function(result) {
                addProcessApi(process_name,process_id,process_description,process_workerId,process_machineId,process_Id,result);
            }); 
        }
    }
}

if(process_updateForm){
    process_updateForm.addEventListener('submit', e =>{
        e.preventDefault();
        $('#processList').modal('hide');
        $('#editProcess').modal('hide');
        const process_btn = this.document.activeElement.getAttribute("id");
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            updateProcess(process_btn);
        });
    });
}