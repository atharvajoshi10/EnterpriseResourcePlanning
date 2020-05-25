var host = 'http://localhost:5000';

const logout = async() => {
    try{
        const res = await axios({
            method: 'GET',
            url: `${host}/employee/api/logout`
        });
        if(res.data.status = 'success'){
            window.location.reload(true);
        }
    }catch(err){
        showAlert('danger', 'Error logging out! Try again.');
    }
};

$(document).ready(function(){
    $("#logoutBtn").click(logout);
});
