function showTables(){
    const TABKEY = 9;
    const ENTER = 13;

    document.getElementById('displayArea').innerHTML=getObject(tables);

    var initialHTML;
    $('.cell,.key').bind('click', function(e) {
        initialHTML=$(this).val();
        $(this).attr('contentEditable', true);
        $(this).focus();
        $(this).select();  
    })

    $('.cell').bind('blur', function(e) {
            console.log("blur");
            $(this).attr('contentEditable', false);
            if((initialHTML!=this.value) && (this.value!=""))
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
            addCell(this,this.value)
        }
    });

    $('.key').bind('blur', function(e) {
        console.log("blur");
        $(this).attr('contentEditable', false);
        if((initialHTML!=this.value) && (this.value!=""))
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

    $("#people-storm").val("SUPERSTORM");
    $('#people-storm').trigger("blur");

    changeKey(document.getElementById("people-SUPERSTORM"))

    changeCell(document.getElementById('people-wb-phones-home'))

    changeKey(document.getElementById('people'))


    killRow(document.getElementById("performers"))

    //end tests
});

