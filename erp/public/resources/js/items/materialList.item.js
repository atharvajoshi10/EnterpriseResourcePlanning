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

