const host = 'http://localhost:5000';
const createForm = document.querySelector('#create-raw_material');
$('input[type="checkbox"]').on('change', function() {
    $('input[type="checkbox"]').not(this).prop('checked', false);
});
const add = async (name,mid,description,category,quantity,measurement,unit,imgLocation=undefined) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/raw_material/api/add`,
        data: {
            raw_material_name: name,
            raw_material_id: mid,
            description: description,
            category: category,
            quantity: quantity,
            measurement: measurement,
            unit:unit,
            raw_material_thumbnail_location: imgLocation
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'New Raw Material created successfully');
        window.setTimeout(() => {
            location.assign('/raw_material')
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
            url: `${host}/raw_material/api/uploadImage`,
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
        const mid = document.getElementById('mid').value;
        const description = document.getElementById('description').value;
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if(checkboxes.length === 0){
            showAlert('danger', 'Please select a category');
            return false;
        }
        const category= $('input[type="checkbox"]:checked').val();
        const quantity=document.getElementById('quantity').value;
        const measurement=document.getElementById('measurement').value;
        const el=document.getElementById('unit')
        const unit = el.options[el.selectedIndex].text;
        const image = document.getElementById('thumbnail');
        if(image.files.length === 0 ){ 
            add(name,mid,description,category,quantity,measurement,unit);
        }else{
            const form = new FormData();
            form.append('thumbnail', document.getElementById('thumbnail').files[0]);
            uploadImage(form).then(function(result) {
                add(name,mid,description,category,quantity,measurement,unit,result);
            }); 
        }
    });
}