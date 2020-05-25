const pdfForm = document.getElementById('pdf-form');
const Id = document.getElementById('Id').value;

const getRevisionNumber = () =>{
    let revision_number = $('#pdfTable tr:last').find("td").eq(1).text();
    revision_number = parseInt(revision_number, 10)+1;
    if(!revision_number){
        revision_number = 0;
    }
    return revision_number;
}

if(pdfForm){
    pdfForm.addEventListener('submit', e =>{
        $('#pdfList').modal('hide');
        e.preventDefault();
        let revision_number = getRevisionNumber();
        alert(revision_number)
        const drawing = document.getElementById('addformControlPdf');
        const drawing_number = document.getElementById('add-drawing-number').value;
        const form = new FormData();
        form.append('drawing', drawing.files[0]);
        uploadPdf(form).then(function(resultPdf) {
            var obj = new Object();
            obj.drawing_location = resultPdf;
            obj.drawing_number = drawing_number;
            obj.drawing_revision_number = revision_number;
            savePdf(obj);
        });
    });
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
        $('#pdfList').modal('hide');
        showAlert('danger', err.response.data.message); 
    }
}

const savePdf = async (obj) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `${host}/items/api/uploadPdf/${Id}`,
            data : {obj}
        });
        if(res.data.status = 'success'){
            location.reload(true);
        }
    }catch(err){
        $('#pdfList').modal('hide');
        showAlert('danger', err.response.data.message); 
    }
}

const deletePdf = async (id) =>{
    try{
        const res = await axios({
            method: 'DELETE',
            url: `${host}/items/api/deletePdf/${Id}`,
            data: {
                drawing_id: id
            }
        });
        if(res.data.status = 'success'){
            showAlert('success', 'Drawing deleted successfully');
            window.setTimeout(() => {
                location.reload(true);
            }, 1500);
        }
    }catch(err){
        $('#pdfList').modal('hide');
        showAlert('danger', err.response.data.message);
    }
}

const deleteDrawing = async (id) => {
    $('#pdfList').modal('hide');
    showConfirm('Are you sure you want to permanently delete the selected item?');
    $('#modal-confirm').modal({
        backdrop: 'static',
        keyboard: false
    })
    .on('click', '#confirm', function(e) {
        $('#modal-confirm').modal('hide');
        deletePdf(id);
    });
}