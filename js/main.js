function showTables(){
    const TABKEY = 9;
    const ENTER = 13;

    document.getElementById('displayArea').innerHTML=getObject(tables);

    var initialHTML;
    $('.cell,.key').bind('click', function(e) {
        initialHTML=$(this).html();
        $(this).attr('contentEditable', true);
        $(this).focus();
        $(this).select();  
    })

    $('.cell').bind('blur', function(e) {
            console.log("blur");
            $(this).attr('contentEditable', false);
            if((initialHTML!=$(this).html()) && ($(this).html()!=""))
                changeCell(this);
    }).keydown(
    function(e){
        console.log('keydown',e.keyCode)
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

    $('.key').bind('blur', function(e) {
        console.log("blur");
        $(this).attr('contentEditable', false);
        if((initialHTML!=$(this).html()) && ($(this).html()!=""))
            changeKey(this);
    }).keydown(
    function(e){
        console.log('keydown',e.keyCode)
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

    changeKey(document.getElementById("people-SUPERSTORM"))

    changeCell(document.getElementById('people-wb-phones-home'))

    changeKey(document.getElementById('people'))


    killRow(document.getElementById("performers"))

    //end tests
});

