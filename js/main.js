function showTables(latest){
    tabIndex=0;
    console.log("LATEST:"+latest)
    const TABKEY = 9;
    const ENTER = 13;

    document.getElementById('displayArea').innerHTML=getObject(tables);

    var initialHTML;
    $('.cell,.key').bind('focus', function(e) {
        initialHTML=this.value;
        $(this).select();  
    });

    $('.cell').bind('blur', function(e) {
        console.log("blur");
        // if(this.value!==initialHTML){
        //     var next = '#'+(parseInt(this.id)+1);
        //     changeCell(this,function(){//we need this callback because the table get rebuilt every time.. need to fix this though blegh.
        //         $(next).focus();
        //         console.log("CALLBACK: "+next)
        //     });
        // }
        changeCell(this);
    }).keydown(
    function(e){
        console.log('keydown',e.keyCode)
        if(e.keyCode == TABKEY) {
            e.preventDefault();
            $('#'+(parseInt(this.id)+1)).focus();
        }
        if(e.keyCode == ENTER) {
            e.preventDefault();
            this.blur();
            addCell(this,this.value)
        }
    });

    $('.key').bind('blur', function(e) {
        console.log("blur");
        // if((initialHTML!=this.value) && (this.value!=""))
            changeKey(this);
    }).keydown(
    function(e){
        if(e.keyCode == TABKEY) {
            e.preventDefault();
            $('#'+(parseInt(this.id)+1)).focus();
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

