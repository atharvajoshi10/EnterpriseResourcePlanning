var host = 'http://localhost:5000';
const id = document.getElementById('Id').value;

const deleteItem = async (id) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `${host}/items/api/delete/${id}`
        });
        if(res.data.status = 'success'){
            showAlert('success', 'Item deleted successfully');
            window.setTimeout(() => {
                location.assign('/items')
            }, 1500);
        }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
};

$(document).ready(function(){
    $("#delete").click(function(e){
        e.preventDefault();
        showConfirm('Are you sure you want to permanently delete the selected item?');
        $('#modal-confirm').modal({
            backdrop: 'static',
            keyboard: false
        })
        .on('click', '#confirm', function(e) {
            $('#modal-confirm').modal('hide');
            deleteItem(id);
        });
    });
});