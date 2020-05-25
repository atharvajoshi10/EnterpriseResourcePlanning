let flag = false;
const sortable = () => {
    var start = -1;
    var end = -1;
    $( "#sortable" ).sortable({
        start: function(event, ui){
            start = $(ui.item).index();
        },
        stop: function(event,ui){
            end = $(ui.item).index();
            sort(start,end);
        }
    });
    $( "#sortable" ).disableSelection();
};

const sort = async(start,end) => {
    flag=true;
    const Id = document.getElementById('Id').value;
    const res = await axios({
        method: 'PATCH',
        url: `${host}/items/api/process/sort/${Id}`,
        data: {
            start, 
            end
        }
    });
}

$(document).ready(function(){
    $("#editProcessList").click(sortable());
});
