const host = 'http://localhost:5000';
const uploadImageApi = async (data,url) =>{
    try{
        const res = await axios({
            method: 'POST',
            url: `${host}/${url}`,
            data
        });
        if(res.data.status = 'success'){
            return res.data.location;
        }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
};

