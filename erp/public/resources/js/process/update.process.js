var host = 'http://localhost:5000';
const updateForm = document.querySelector('.form');

const update = async (name,pid,description,workerId,machineId,Id) => {
    try{
    const res = await axios({
        method: 'PATCH',
        url: `${host}/process/api/update/${Id}`,
        data: {
            process_name: name,
            process_id: pid,
            description: description,
            worker_id: workerId,
            machine_id: machineId
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'Process updated successfully');
        window.setTimeout(() => {
            location.assign('/process')
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
};

const add = async (name,pid,description,workerId,machineId) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/process/api/add`,
        data: {
            process_name: name,
            process_id: pid,
            description: description,
            worker_id: workerId,
            machine_id: machineId
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'New Process created successfully');
        window.setTimeout(() => {
            location.assign('/process')
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
};

const updateProcess = async (btn) =>{
    const name = document.getElementById('name').value;
    const pid = document.getElementById('pid').value;
    const description = document.getElementById('description').value;
    const workerId = document.getElementById('workerId').value;
    const machineId = document.getElementById('machineId').value;
    const Id = document.getElementById('Id').value;
    if(btn === 'update'){
        update(name,pid,description,workerId,machineId,Id);
    }else if(btn === 'saveAsNew'){
        const initialPid = document.getElementById('initialPid').value;
        if(pid == initialPid){
            showAlert('danger', 'Assign a new Process Id');
            return false;
        }
        add(name,pid,description,workerId,machineId);
    }
}

if(updateForm){
    updateForm.addEventListener('submit', e =>{
        e.preventDefault();
        const btn = this.document.activeElement.getAttribute("id");
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            updateProcess(btn);
        });
    });
}