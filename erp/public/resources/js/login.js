const loginForm = document.querySelector('.form');

const loginApi = async (username,password) => {
    try{
    const res = await axios({
        method: 'POST',
        url: `${host}/employee/api/login`,
        data: {
            e_username: username,
            e_password: password
        },
    });
    if(res.data.status = 'success'){
        showAlert('success', 'Logged in successfully');
        window.setTimeout(() => {
            location.assign('/employee/dashboard')
        }, 1500);
    }
    }catch(err){
        showAlert('danger', err.response.data.message);
    }
};

if(loginForm){
    loginForm.addEventListener('submit', e =>{
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        loginApi(username,password);
    });
}

