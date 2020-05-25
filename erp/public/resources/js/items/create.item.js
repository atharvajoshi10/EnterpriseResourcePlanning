//-------------------------Raw Material List-----------------------------
$('#rawMaterialPicker').selectpicker();
let selectedRawMaterial;
let selectedRawMaterialId;

$('#rawMaterialPicker').change(function () {
    $("#raw_material-table").find("tr").remove();
    $("#raw_material-table").find("th").remove();
    selectedRawMaterialId = $('#rawMaterialPicker').val();
    selectedRawMaterial =$('#rawMaterialPicker :selected').toArray().map(RawMaterial => RawMaterial.text);
    createRawMaterialTable(selectedRawMaterial);
});

function createRawMaterialTable(selectedRawMaterial) {
    $("#raw_material-table").find("tr").remove();
    $("#raw_material-table").find("th").remove();
    if(selectedRawMaterial.length){
        $("#raw_material-table thead").append(
            `<tr class="table-info">
                <th scope='col'>Raw Material Name</th> 
                <th scope='col'>Quantity</th>  
            </tr>`
        );
        for(let i =0; i<selectedRawMaterial.length;i++){
            $("#raw_material-table tbody").append(
                `<tr> 
                <td id=${selectedRawMaterialId[i]}>${selectedRawMaterial[i]}</td>
                <td><input class='form-control form-control-sm', type='number', placeholder='Enter Quantity', required></td>
                </tr>`
            );
        }
    }
}

const createMaterialList = () =>{
    let attached_materials = new Array();
    $("#raw_material-table tbody tr").each(function () {
        var row = $(this);
        var obj = new Object();
        obj.material = row.find("td").eq(0).attr('id');
        row.find('td input').each(function() {
            obj.quantity = this.value;
        });
        attached_materials.push(obj);
    });
    if(attached_materials.length < 1){
        return undefined;
    }else{
        return attached_materials;
    }
}
//-------------------------Process List-----------------------------

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
                <td><input class="form-control form-control-sm" type="date"></td>
                <td>Approved</td>
                </tr>`
            );
        }
    }
}

const createProcessList = () =>{
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
    if(process_list.length<1){
        return undefined;
    }else{
        return process_list;
    }
}

//-------------------------API Calls-----------------------------
const createForm = document.getElementById('create-item');
let drawing_list = new Array();

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
        $('#createItem').modal('hide');
        showAlert('danger', err.response.data.message); 
    }
}

const uploadPdf = async (data) =>{
    try{
        const res = await axios({
            method: 'POST',
            url: `${host}/items/api/uploadPdf`,
            data
        });
        if(res.data.status = 'success'){
            return res.data.location;
        }
    }catch(err){
        $('#createItem').modal('hide');
        showAlert('danger', err.response.data.message); 
    }
}

if(createForm){
    createForm.addEventListener('submit', e =>{
        e.preventDefault();
        $('#createItem').modal('hide');
        const name = document.getElementById('name').value;
        const id = document.getElementById('iid').value;
        const description = document.getElementById('description').value;
        const drawing_number = document.getElementById('drawing-number').value;
        const process_list = createProcessList();
        const attached_materials = createMaterialList();
        const image = document.getElementById('thumbnail');
        const drawing = document.getElementById('drawing');
        const form = new FormData();
        form.append('thumbnail', image.files[0]);
        uploadImage(form).then(function(resultImg) {
            const form = new FormData();
            form.append('drawing', drawing.files[0]);
            uploadPdf(form).then(function(resultPdf) {
                var obj = new Object();
                obj.drawing_location = resultPdf;
                obj.drawing_number = drawing_number;
                drawing_list.push(obj);
                add(name,id,description,attached_materials,process_list,resultImg,drawing_list);
            });
        });
    });
}

const add = async (name,id,description,attached_materials,process_list,imageLoc,drawing_list) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/items/api/add`,
        data: {
            item_name: name,
            item_id: id,
            description: description,
            drawing_list,
            process_list,
            attached_materials,
            item_thumbnail_location: imageLoc
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'New Item created successfully');
        window.setTimeout(() => {
            window.location.reload(true);
        }, 1500);
    }
    }catch(err){
        $('#createItem').modal('hide');
        showAlert('danger', err.response.data.message);
    }
};


function resetForm(){
    $("#raw_material-table").find("tr").remove();
    $("#raw_material-table").find("th").remove();
    $("#process-table").find("tr").remove();
    $("#process-table").find("th").remove();
    $('#rawMaterialPicker').selectpicker('deselectAll');
    $('#processPicker').selectpicker('deselectAll');
}