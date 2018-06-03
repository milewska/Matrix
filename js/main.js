function showTables(){
    document.getElementById('displayArea').innerHTML=getObject(tables);

    var initialHTML;
    $('.cell').bind('click', function(e) {
        initialHTML=$(this).html();
        $(this).attr('contentEditable', true);
        $(this).focus();
        $(this).select();  
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
            // e.preventDefault();
            // addRow(this)
        }
        if(e.keyCode == ENTER) {
            e.preventDefault();
            this.blur();
            addCell(this,this.innerHTML)
        }
    });

    $('.key').bind('click', function(e) {
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
            var next=$(this).next();
            this.blur();//we need to blur this or else it won't actually get saved to the Object and it will vanish!
            next.click();
        }
        if(e.keyCode == ENTER) {
            e.preventDefault();
            this.blur();
            addRow(this)
        }
    });
}

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

    changeCell(document.getElementById("people-SUPERSTORM"))

    changeCell(document.getElementById('people'))

    killRow(document.getElementById("performers"))

    //end tests
});

