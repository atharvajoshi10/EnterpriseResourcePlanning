var host = 'http://localhost:5000';
const updateForm = document.querySelector('.form');
const defaultLoc = document.getElementById('defaultImg').value;

const update = async (name,pid,description,workerId,machineId,Id,imgLocation=defaultLoc) => {
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
            location.assign(`/process/${Id}`)
        }, 1500);
    }
    }catch(err){
        $('#editProcess').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const add = async (name,pid,description,workerId,machineId,imgLocation=defaultLoc) => {
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
        showAlert('success', 'New Process created successfully');
        window.setTimeout(() => {
            location.assign('/process')
        }, 1500);
    }
    }catch(err){
        $('#editProcess').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};

const uploadImage = async (data) =>{
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
    const name = document.getElementById('name').value;
    const pid = document.getElementById('pid').value;
    const description = document.getElementById('description').value;
    const workerId = document.getElementById('workerId').value;
    const machineId = document.getElementById('machineId').value;
    const Id = document.getElementById('Id').value;
    const image = document.getElementById('thumbnail');
    if(btn === 'saveAsNew'){
        const initialPid = document.getElementById('initialPid').value;
        if(pid == initialPid){
            $('#editProcess').modal('hide');
            showAlert('danger', 'Assign a new Process Id');
            return false;
        }
    }
    if(image.files.length === 0 ){ 
        if(btn === 'update'){
            update(name,pid,description,workerId,machineId,Id);
        }else if(btn === 'saveAsNew'){
            add(name,pid,description,workerId,machineId);
        }
    }else{
        const form = new FormData();
        form.append('thumbnail', document.getElementById('thumbnail').files[0])
        if(btn === 'update'){
            uploadImage(form).then(function(result) {
                update(name,pid,description,workerId,machineId,Id,result);
            }); 
        }else if(btn === 'saveAsNew'){
            uploadImage(form).then(function(result) {
                add(name,pid,description,workerId,machineId,result);
            }); 
        }
    }
}

if(updateForm){
    updateForm.addEventListener('submit', e =>{
        e.preventDefault();
        $('#editProcess').modal('hide');
        const btn = this.document.activeElement.getAttribute("id");
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            updateProcess(btn);
        });
    });
}