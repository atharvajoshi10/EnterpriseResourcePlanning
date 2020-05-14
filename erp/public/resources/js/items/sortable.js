$(document).ready(function(){
    $("#editProcessList").click(function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
    });
});