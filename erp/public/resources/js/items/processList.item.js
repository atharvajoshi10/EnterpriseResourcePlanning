$('#processList').on('hidden.bs.modal', function () {
    if(flag){
        window.location.reload(true);
    }
});

$('#processPicker').selectpicker();
let selectedProcess;
let selectedProcessId;

$('#processPicker').change(function () {
    $("#process-table").find("tr").remove();
    $("#process-table").find("th").remove();
    selectedProcessId = $('#processPicker').val();
    selectedProcess =$('#processPicker :selected').toArray().map(Process => Process.text);
    createProcessTable(selectedProcess);
});
// <input type="text" id="datepicker"></input>
function createProcessTable(selectedProcess) {
    $("#process-table").find("tr").remove();
    $("#process-table").find("th").remove();
    if(selectedProcess.length){
        $("#process-table thead").append(
            `<tr class="table-info">
                <th scope='col'>Process Name</th> 
                <th scope='col'>Scheduled Date</th>
                <th scope='col'>Status</th>
            </tr>`
        );
        for(let i =0; i<selectedProcess.length;i++){
            $("#process-table tbody").append(
                `<tr> 
                <td id = ${selectedProcessId[i]}>${selectedProcess[i]}</td>
                <td><input class="form-control form-control-sm" type="date" required></td>
                <td>Approved</td>
                </tr>`
            );
        }
    }
}

const createProcessList = () =>{
    flag=false;
    $('#processList').modal('hide');
    let process_list = new Array();
    $("#process-table tbody tr").each(function () {
        var row = $(this);
        var obj = new Object();
        obj.process = row.find("td").eq(0).attr('id');
        $(row.find('td input')).each(function() {
            obj.scheduled_date =this.value;
        });
        obj.status = 'approved'
        process_list.push(obj);
    });
    appendProcessApi(process_list);
}

const appendProcessApi = async (process_list) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `${host}/items/api/process/append/${Id}`,
            data: {
                process_list
            }
        });
        if(res.data.status = 'success'){
            showAlert('success', 'Process added successfully');
            window.setTimeout(() => {
                window.location.reload(true);
            }, 1500);
        }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
}

const deleteProcessApi = async (id) =>{
    try{
        const res = await axios({
            method: 'DELETE',
            url: `${host}/items/api/process/delete/${Id}`,
            data: {
                process_id: id
            }
        });
        if(res.data.status = 'success'){
            showAlert('success', 'Process deleted successfully');
            window.setTimeout(() => {
                location.reload(true);
            }, 1500);
        }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
}


const deleteProcess = async (id) => {
    flag=false;
    $('#processList').modal('hide');
    showConfirm('Are you sure you want to permanently delete the selected item?');
    $('#modal-confirm').modal({
        backdrop: 'static',
        keyboard: false
    })
    .on('click', '#confirm', function(e) {
        $('#modal-confirm').modal('hide');
        deleteProcessApi(id);
    });
}

const editProcess = (process) => {
    document.getElementById('process-name').value = process.process_name;
    document.getElementById('process-id').value = process.process_id;
    document.getElementById('process-description').value = process.description;
    document.getElementById('process-workerId').value = process.worker_id;
    document.getElementById('process-machineId').value = process.machine_id;
    document.getElementById('process-Id').value = process._id;
    document.getElementById('initial-processId').value= process.process_id;
    document.getElementById('process-defaultImg').value = process.process_thumbnail_location;
}

function setProcessUpdateForm(process_list) {
    document.getElementById('disabled-process-name').value=process_list.process.process_name;
    let date = process_list.scheduled_date.split('T')[0];
    document.getElementById('scheduled-date').value=date;
    document.getElementById('hidden-process-Id').value=process_list.process._id;
    document.getElementById('status').value=process_list.status;
}

function getSingleProcessUpdateFrom(){
    const pl_scheduled_date=document.getElementById('scheduled-date').value;
    const pl_process_Id=document.getElementById('hidden-process-Id').value;
    const pl_status=document.getElementById('status').value;
    let obj = new Object();
    obj._id = pl_process_Id;
    obj.scheduled_date = pl_scheduled_date;
    obj.status = pl_status;
    return obj;
}

const singleProcess_UpdateForm = document.getElementById('singleProcess-updateForm');
if(singleProcess_UpdateForm){
    singleProcess_UpdateForm.addEventListener('submit', e =>{
        e.preventDefault();
        flag=false;
        $('#processList').modal('hide');
        showConfirm('Are you sure you want to permanently update the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            singleupdateProcessApi(getSingleProcessUpdateFrom());
        });
    });
}

const singleupdateProcessApi = async (obj) =>{
    try{
        const res = await axios({
            method: 'PATCH',
            url: `${host}/items//api/processList/update/${Id}`,
            data: {
                Id:obj._id,
                date:obj.scheduled_date,
                status:obj.status
            }
        });
        if(res.data.status = 'success'){
            showAlert('success', 'Process List updated successfully');
            window.setTimeout(() => {
                window.location.reload(true);
            }, 1500);
        }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
}