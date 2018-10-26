function showTables(latest){
    tabIndex=0;
    const TABKEY = 9;
    const ENTER = 13;

    document.getElementById('displayArea').innerHTML=getObject(tables);

    let initialHTML;

    //bind keyboard events
    $('.cell,.key').bind('focus', function(e) {
        console.log("Focus")
        seekExisting(this);
        initialHTML=this.value;
        $(this).select();  
    }).keyup(function(e){
        if(e.keyCode == TABKEY) {
            e.preventDefault();
            // $('#'+(parseInt(this.id)+1)).focus();
        }
    });
    $('.cell').bind('blur', function(e) {
        if((initialHTML!=this.value) && (this.value!="")){
            changeCell(this,this.value);
        }
    }).keyup(function(e){
        // seekExisting(this);
        if(e.keyCode == ENTER) {
            e.preventDefault();
            this.blur();
            addCell(this,this.value)
        }
    }).focus(function(e){
        // seekExisting(document.getElementById(this.id-1));
    });
    $('.key').bind('blur', function(e) {
        if((initialHTML!=this.value) && (this.value!="")){
            this.value=initialHTML;
        }
    }).keydown(function(e){
        // seekExisting(this)
        if(e.keyCode == ENTER) {
            e.preventDefault();
            if((initialHTML!=this.value) && (this.value!="")){
                changeKey(this,this.value);
            }
            addRow(this)
        }
        if(e.keyCode == TABKEY) {
            if((initialHTML!=this.value) && (this.value!="")){
                changeKey(this,this.value);
            }
        }
    });
//end binding keyboard keys for events

    if(latest)//this is just to focus on the next field after a key event 
        $('#'+(parseInt(latest.id)+1)).focus();

  
    // setup autocomplete function pulling from currencies[] array
    $('.cell').autocomplete({
        lookup: getFlat(tables),
        onSelect: function (suggestion) {
            changeCell(this,suggestion.value)
        }
    });    
    $('.key').autocomplete({
        lookup: getFlat(tables),
        onSelect: function (suggestion) {
            changeKey(this,suggestion.value)
        }
    });
}

$(document).ready(function(){
	showTables(document.getElementById("1"));
});

$('#tester').click(function(){
       // Tests
       console.log(tables.performers.storm)
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
})

