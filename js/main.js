function showTables(latest){
    tabIndex=0;
    console.log("LATEST:"+latest)
    const TABKEY = 9;
    const ENTER = 13;

    document.getElementById('displayArea').innerHTML=getObject(tables);

    var initialHTML;
    $('.cell,.key').bind('focus', function(e) {
        console.log('focus')
        initialHTML=this.value;
        $(this).select();  
    }).keydown(
    function(e){
        if(e.keyCode == TABKEY) {
            e.preventDefault();
            $('#'+(parseInt(this.id)+1)).focus();
        }
    });

    $('.cell').bind('blur', function(e) {
        console.log("blur");
        if((initialHTML!=this.value) && (this.value!="")){
            var next = '#'+(parseInt(this.id)+1);
            changeCell(this)
        }
    }).keydown(
    function(e){
        if(e.keyCode == ENTER) {
            e.preventDefault();
            this.blur();
            addCell(this,this.value)
        }
    });

    $('.key').bind('blur', function(e) {
        console.log("blur");
        if((initialHTML!=this.value) && (this.value!="")){
            var next = '#'+(parseInt(this.id)+1);
            changeKey(this);
        }

    }).keydown(
    function(e){
        if(e.keyCode == ENTER) {
            e.preventDefault();
            this.blur();
            addRow(this)
        }
    });
    if(latest)//this is just for the very first display.. 
        $('#'+(parseInt(latest.id)+1)).focus();
}

$(document).ready(function(){
	showTables(document.getElementById("1"));
    // Tests
    // addRow(document.getElementById("people-storm"))
    // addRow(document.getElementById('people-storm-email'))
    // addRow(document.getElementById('people-storm-roles'))
    // addRow(document.getElementById('people'))
    // addRow(document.getElementById("topLevel"))

    // $("#people-storm").val("SUPERSTORM");
    // $('#people-storm').trigger("blur");

    // changeKey(document.getElementById("people-SUPERSTORM"))

    // changeCell(document.getElementById('people-wb-phones-home'))

    // changeKey(document.getElementById('people'))


    // killRow(document.getElementById("performers"))

    //end tests
});

