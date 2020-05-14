var host = 'http://localhost:5000';
const createForm = document.querySelector('.form');
const add = async (name,pid,description,workerId,machineId,location=undefined) => {
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
            process_thumbnail_location:location
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'Process created successfully');
        window.setTimeout(() => {
            window.location.assign('/process');
        }, 1500);
    }
    }catch(err){
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
        showAlert('danger', err.response.data.message);
    }
}

if(createForm){
    createForm.addEventListener('submit', e =>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const pid = document.getElementById('pid').value;
        const description = document.getElementById('description').value;
        const workerId = document.getElementById('workerId').value;
        const machineId = document.getElementById('machineId').value;
        const image = document.getElementById('thumbnail');
        if(image.files.length == 0 ){ 
            add(name,pid,description,workerId,machineId);
        } else{
            const form = new FormData();
            form.append('thumbnail', document.getElementById('thumbnail').files[0])
            uploadImage(form).then(function(result) {
                add(name,pid,description,workerId,machineId,result);
            });
        }   
    });
}