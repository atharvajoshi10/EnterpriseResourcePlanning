const createProcessForm = document.getElementById('create-process-form');
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
        $('#create-process-modal').modal('hide');
        showAlert('success', 'New Process created successfully');
        window.setTimeout(() => {
            window.location.assign('/process');
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message,true);
    }
};

if(createProcessForm){
    createProcessForm.addEventListener('submit', e =>{
        e.preventDefault();
        const createProcessName = document.getElementById('create-process-name').value;
        const createProcessId = document.getElementById('create-process-id').value;
        const createProcessDescription = document.getElementById('create-process-description').value;
        const createProcessWorkerId = document.getElementById('create-process-workerId').value;
        const createProcessMachineId = document.getElementById('create-process-machineId').value;
        const createProcessImage = document.getElementById('create-process-thumbnail');
        if(createProcessImage.files.length == 0 ){ 
            createProcessApi(createProcessName,createProcessId,createProcessDescription,createProcessWorkerId,createProcessMachineId);
        } else{
            const url = 'process/api/uploadImage'
            const form = new FormData();
            form.append('thumbnail', createProcessImage.files[0])
            uploadImageApi(form,url).then(function(result) {
                createProcessApi(createProcessName,createProcessId,createProcessDescription,createProcessWorkerId,createProcessMachineId,result);
            });
        }   
    });
}