const hideAlert = () => {
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
}

const showAlert = (type,msg) => {
    hideAlert();
    const markup = `<div class='alert alert-${type} fade show w-50 m-auto border-0' role='alert'>${msg}</div>`;
    document.querySelector('nav').insertAdjacentHTML('afterend', markup);
    window.setTimeout(hideAlert, 2000)
}

const hideConfirm = () => {
    const el = document.querySelector('#modal-confirm');
    if(el) el.parentElement.removeChild(el);
}

const showConfirm = (msg) =>{
    hideConfirm();
    const markup = `
<div class="modal fade" id="modal-confirm" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Warning!</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      </div>
      <div class="modal-body">
        <p>${msg}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="confirm" type="button">Save Changes</button>
        <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`
    document.querySelector('.container').insertAdjacentHTML('afterend', markup);
}
