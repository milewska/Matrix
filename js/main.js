$(document).ready(function(){
	showTables();
});

function showTables(){
	document.getElementById('displayArea').innerHTML=getObject(tables);

	var initialHTML;
	$('.cell').bind('click', function(e) {
		initialHTML=$(this).html();
        $(this).attr('contentEditable', true);
        $(this).focus();
    }).blur(
        function() {
        	console.log("blur");
            $(this).attr('contentEditable', false);
            if((initialHTML!=$(this).html()) && ($(this).html()!=""))
           		changeCell(this);
    }).keydown(
    function(e){
    	console.log('keydown')
    	keyDown(e)
    });
}

