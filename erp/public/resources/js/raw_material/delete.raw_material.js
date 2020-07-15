const deleteRawMaterialApi = async (rawMaterialId) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `${host}/raw_material/api/delete/${rawMaterialId}`
        });
        if(res.data.status = 'success'){
            showAlert('success', 'Raw Material deleted successfully');
            window.setTimeout(() => {
                location.assign('/raw_material')
            }, 1500);
        }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
};

$(document).ready(function(){
    $("#delete-material-btn").click(function(e){
        e.preventDefault();
        showConfirm('Are you sure you want to permanently delete the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            const rawMaterialId = document.getElementById('material-Id').value;
            deleteRawMaterialApi(rawMaterialId);
        });
    });
});