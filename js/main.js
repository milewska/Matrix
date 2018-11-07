$(document).ready(function(){
    showTables(document.getElementById("1"));
});

function showTables(latest){
    tabIndex=0;
    const TABKEY = 9;
    const ENTER = 13;

    document.getElementById('displayArea').innerHTML=formatObject(tables);
    let initialHTML;

    //bind keyboard events
    $('.cell,.key').bind('focus', function(e) {
        console.log("Focus: "+this.className)
        getSimilar(this); //This is how we show the magic in #extra
        initialHTML=this.value;
        $(this).select();  
    });

    $('.cell').bind('blur', function(e) {
        if((initialHTML!=this.value) && (this.value!="")){
            changeCell(this,this.value);
        }
    }).keyup(function(e){
        if(e.keyCode == ENTER) {
            addCell(this,this.value)
        }
    })
    $('.key').bind('blur', function(e) {
        if((initialHTML!=this.value) && (this.value!="")){
            changeKey(this,this.value);
        }
    }).keydown(function(e){
        if(e.keyCode == ENTER) {
            addRow(this);
            window.scrollTo(0,document.body.scrollHeight);
        }
    })
//end binding keyboard keys for events

    if(latest)//this is just to focus on the next field after a key event 
        $('#'+(parseInt(latest.id)+1)).focus();

    // setup autocomplete function pulling from currencies[] array
    $('.cell').autocomplete({
        lookup: getFlat(tables),//Buids the 1D array of suggestions
        onSelect: function (suggestion) {
            changeCell(this,suggestion.value)
        }
    });    
    $('.key').autocomplete({
        lookup: getFlat(tables),//Buids the 1D array of suggestions
        onSelect: function (suggestion) {
            changeKey(this,suggestion.value)
            // this.value=suggestion.value
        }
    });
}

let getSimilar = function(obj){
    console.log(obj.value)
    document.getElementById('extra').innerHTML=formatObject(findObjects(tables,obj.value));
    // showTables();
}
