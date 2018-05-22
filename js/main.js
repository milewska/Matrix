$(document).ready(function(){
	showTables();
    // Tests
    addRow(document.getElementById("people-storm"))
    addRow(document.getElementById('people-storm-email'))
    addRow(document.getElementById('people-storm-roles'))
    addRow(document.getElementById('people'))
    addRow(document.getElementById("topLevel"))


    $("#people-storm").html("SUPERSTORM");
    $('#people-storm').trigger("blur");
    // $('#people-SUPERSTORM-roles').trigger("blur");


    // changeCell(document.getElementById("people-SUPERSTORM"))
    // changeCell(document.getElementById('people-storm-email'))
    // changeCell(document.getElementById('people-storm-email-21'))
    // changeCell(document.getElementById('people.storm.roles'))
    // changeCell(document.getElementById('people.storm.roles.main'))
    // changeCell(document.getElementById('people.storm.roles.main.judge'))
    // changeCell(document.getElementById('people'))
    // changeCell(document.getElementById("topLevel"))



    // killRow(document.getElementById('people'))
    // killRow(document.getElementById('people.storm.roles'))
    // killRow(document.getElementById('people.storm'))
    // killRow(document.getElementById('people'))
    // killRow(document.getElementById("topLevel"))



    //end tests
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
    	console.log('keydown',e.keyCode)
        var TABKEY = 9;
        var ENTER = 13;

        if(e.keyCode == TABKEY) {
            e.preventDefault();
            tabDown(this)
        }
        if(e.keyCode == ENTER) {
            e.preventDefault();
            enterDown(this)
        }
    });
}

