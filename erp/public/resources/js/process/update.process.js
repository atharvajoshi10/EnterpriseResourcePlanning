const updateProcessForm = document.getElementById('update-process-form');
let process_defaultImgLoc;

const updateProcessApi = async (process_name,process_id,process_description,process_workerId,process_machineId,processId,process_imgLocation=process_defaultImgLoc) => {
    try{
    const res = await axios({
        method: 'PATCH',
        url: `${host}/process/api/update/${processId}`,
        data: {
            process_name: process_name,
            process_id: process_id,
            description: process_description,
            worker_id: process_workerId,
            machine_id: process_machineId,
            process_thumbnail_location: process_imgLocation
        },
    });
    if(res.data.status = 'success'){
        $('#update-process-modal').modal('hide');
        showAlert('success', 'Process updated successfully');
        window.setTimeout(() => {
            location.assign(`/process/${processId}`)
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message,true);
    }
};

const createProcessApi = async (process_name,process_id,process_description,process_workerId,process_machineId,process_location=undefined) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/process/api/create`,
        data: {
            process_name: process_name,
            process_id: process_id,
            description: process_description,
            worker_id: process_workerId,
            machine_id: process_machineId,
            process_thumbnail_location:process_location
        },
    });
    if(res.data.status = 'success'){
        $('#update-process-modal').modal('hide');
        showAlert('success', 'New Process created successfully');
        window.setTimeout(() => {
            window.location.assign('/process');
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message,true);        
    }
};

const updateProcessMiddleware = async (updateType) =>{
    const updateProcessName = document.getElementById('update-process-name').value;
    const updateProcessId = document.getElementById('update-process-id').value;
    const updateProcessDescription = document.getElementById('update-process-description').value;
    const updateProcessWorkerId = document.getElementById('update-process-workerId').value;
    const updateProcessMachineId = document.getElementById('update-process-machineId').value;
    const updateProcessImage = document.getElementById('update-process-thumbnail');
    const process_Id = document.getElementById('process-Id').value;
    const url = 'process/api/uploadImage';
    if(updateType === 'saveAsNew-process-submitBtn'){
        const initialProcessId = document.getElementById('update-initial-processId').value;
        if(updateProcessId == initialProcessId){
            showAlert('danger', 'Assign a new Process Id',true);
            return false;
        }
    }
    if(updateProcessImage.files.length === 0 ){ 
        if(updateType === 'update-process-submitBtn'){
            updateProcessApi(updateProcessName,updateProcessId,updateProcessDescription,updateProcessWorkerId,updateProcessMachineId,process_Id);
        }else if(updateType === 'saveAsNew-process-submitBtn'){
            createProcessApi(updateProcessName,updateProcessId,updateProcessDescription,updateProcessWorkerId,updateProcessMachineId);
        }
    }else{
        const form = new FormData();
        form.append('thumbnail', updateProcessImage.files[0])
        if(updateType === 'update-process-submitBtn'){
            uploadImageApi(form,url).then(function(result) {
                updateProcessApi(updateProcessName,updateProcessId,updateProcessDescription,updateProcessWorkerId,updateProcessMachineId,process_Id,result);
            }); 
        }else if(updateType === 'saveAsNew-process-submitBtn'){
            uploadImageApi(form,url).then(function(result) {
                createProcessApi(updateProcessName,updateProcessId,updateProcessDescription,updateProcessWorkerId,updateProcessMachineId,result);
            }); 
        }
    }
}

if(updateProcessForm){
    updateProcessForm.addEventListener('submit', e =>{
        e.preventDefault();
        const updateType = this.document.activeElement.getAttribute("id");
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            updateProcessMiddleware(updateType);
        });
    });
}

const setUpdateProcessForm = (process) => {
    document.getElementById('update-process-name').value = process.process_name;
    document.getElementById('update-process-id').value = process.process_id;
    document.getElementById('update-process-description').value = process.description;
    document.getElementById('update-process-workerId').value = process.worker_id;
    document.getElementById('update-process-machineId').value = process.machine_id;
    document.getElementById('update-initial-processId').value= process.process_id;
    document.getElementById('update-process-defaultImgLoc').value = process.process_thumbnail_location;
    process_defaultImgLoc = document.getElementById('update-process-defaultImgLoc').value;
}